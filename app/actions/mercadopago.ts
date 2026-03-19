"use server"

import { getProductById } from "@/lib/products"

export async function checkMercadoPagoAvailable() {
  return !!process.env.MERCADOPAGO_ACCESS_TOKEN
}

interface PayerData {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export async function createMercadoPagoPreference(
  cartItems: Array<{ id: string; quantity: number }>,
  payerData: PayerData,
) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado")
  }

  console.log("[v0] Iniciando criação de preferência do Mercado Pago")

  const items = cartItems.map((item) => {
    const product = getProductById(item.id)
    if (!product) {
      throw new Error(`Produto com id "${item.id}" não encontrado`)
    }

    return {
      title: product.name,
      description: product.description,
      unit_price: product.price,
      quantity: item.quantity,
      currency_id: "BRL",
    }
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  // Forçar HTTPS em produção
  let baseUrl = appUrl
  if (!appUrl.startsWith("http://localhost")) {
    baseUrl = appUrl.replace(/^http:\/\//i, "https://")
  }

  console.log("[v0] URL base configurada:", baseUrl)
  console.log("[v0] Quantidade de itens:", items.length)
  console.log("[v0] Email do pagador:", payerData.email)

  const phoneDigits = payerData.phone.replace(/\D/g, "")
  const areaCode = phoneDigits.slice(0, 2) || "11"
  const phoneNumber = phoneDigits.slice(2) || "999999999"

  console.log("[v0] Telefone formatado - DDD:", areaCode, "Número:", phoneNumber)

  const preference = {
    items,
    payer: {
      email: payerData.email,
      name: payerData.firstName,
      surname: payerData.lastName,
      phone: {
        area_code: areaCode,
        number: phoneNumber,
      },
    },
    back_urls: {
      success: `${baseUrl}/pedido-confirmado`,
      failure: `${baseUrl}/checkout`,
      pending: `${baseUrl}/checkout`,
    },
    auto_return: "approved" as const,
    statement_descriptor: "TIOSKO",
    external_reference: `TIOSKO-${Date.now()}`,
    ...(process.env.NEXT_PUBLIC_APP_URL && {
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
    }),
  }

  console.log("[v0] Preferência montada:", JSON.stringify(preference, null, 2))

  try {
    console.log("[v0] Enviando requisição para Mercado Pago...")
    console.log("[v0] Token usado (primeiros 10 caracteres):", accessToken.substring(0, 10) + "...")

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    })

    console.log("[v0] Status da resposta:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[v0] Corpo da resposta de erro:", errorBody)

      try {
        const errorData = JSON.parse(errorBody)
        console.log("[v0] Erro parseado:", JSON.stringify(errorData, null, 2))

        if (errorData.code === "PA_UNAUTHORIZED_RESULT_FROM_POLICIES") {
          throw new Error(
            "Erro de política do Mercado Pago. Possíveis causas:\n" +
              "1. O Access Token não tem as permissões necessárias\n" +
              "2. A conta precisa ser verificada no Mercado Pago\n" +
              "3. Use credenciais de PRODUÇÃO (não de teste) se estiver em produção\n" +
              "Consulte CONFIGURACAO_MERCADOPAGO.md para mais detalhes.",
          )
        }
        if (errorData.message?.includes("invalid") || errorData.status === 401) {
          throw new Error(
            "Access Token do Mercado Pago inválido ou expirado. Verifique suas credenciais no painel do Mercado Pago.",
          )
        }

        // Retornar mensagem de erro específica da API
        throw new Error(errorData.message || `Erro ${response.status}: ${errorBody}`)
      } catch (parseError) {
        throw new Error(`Erro ${response.status} ao criar preferência: ${errorBody}`)
      }
    }

    const data = await response.json()
    console.log("[v0] Preferência criada com sucesso. ID:", data.id)

    return {
      id: data.id,
      init_point: data.init_point,
    }
  } catch (error) {
    console.log("[v0] Erro capturado:", error)
    throw error
  }
}
