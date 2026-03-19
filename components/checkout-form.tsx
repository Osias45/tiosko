"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Lock, AlertCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { StripeCheckout } from "@/components/stripe-checkout"
import { createMercadoPagoPreference, checkMercadoPagoAvailable } from "@/app/actions/mercadopago"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CheckoutForm() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "mercadopago">("stripe")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [mercadoPagoAvailable, setMercadoPagoAvailable] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const shipping = total >= 200 ? 0 : 15
  const finalTotal = total + shipping

  useEffect(() => {
    checkMercadoPagoAvailable().then(setMercadoPagoAvailable)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowPaymentForm(true)
  }

  const handleMercadoPagoPayment = async () => {
    if (!mercadoPagoAvailable) {
      alert("Mercado Pago não está disponível no momento. Por favor, use outra forma de pagamento.")
      return
    }

    setIsProcessing(true)
    try {
      const cartItems = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }))

      const preference = await createMercadoPagoPreference(cartItems, {
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })

      window.location.href = preference.init_point
    } catch (error) {
      console.error("Erro ao processar pagamento:", error)

      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(
        `Erro ao processar pagamento com Mercado Pago:\n\n${errorMessage}\n\nPor favor, tente usar o Stripe ou verifique a configuração do Mercado Pago.`,
      )

      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    router.push("/carrinho")
    return null
  }

  if (showPaymentForm) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setShowPaymentForm(false)}>
              ← Voltar para informações de entrega
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Escolha a forma de pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "stripe" | "mercadopago")}
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-sm text-muted-foreground">Cartão de crédito internacional</p>
                    </div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border border-border ${
                    mercadoPagoAvailable ? "hover:bg-muted/50 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <RadioGroupItem value="mercadopago" id="mercadopago" disabled={!mercadoPagoAvailable} />
                  <Label
                    htmlFor="mercadopago"
                    className={`flex items-center gap-3 flex-1 ${
                      mercadoPagoAvailable ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00b1ea">
                      <path d="M15.7 11.9c-.7-.7-1.7-1.1-2.7-1.1s-2 .4-2.7 1.1c-.7.7-1.1 1.7-1.1 2.7s.4 2 1.1 2.7c.7.7 1.7 1.1 2.7 1.1s2-.4 2.7-1.1c.7-.7 1.1-1.7 1.1-2.7s-.4-2-1.1-2.7zm-2.7 4.4c-.4 0-.9-.2-1.2-.5-.3-.3-.5-.7-.5-1.2s.2-.9.5-1.2c.3-.3.7-.5 1.2-.5s.9.2 1.2.5c.3.3.5.7.5 1.2s-.2.9-.5 1.2c-.3.3-.7.5-1.2.5z" />
                    </svg>
                    <div>
                      <p className="font-medium">Mercado Pago {!mercadoPagoAvailable && "(Indisponível)"}</p>
                      <p className="text-sm text-muted-foreground">PIX, Cartão, Boleto</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {!mercadoPagoAvailable && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Mercado Pago Indisponível</AlertTitle>
                  <AlertDescription>
                    O Mercado Pago não está configurado. Por favor, use o Stripe para completar sua compra ou configure
                    a variável de ambiente MERCADOPAGO_ACCESS_TOKEN.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {paymentMethod === "stripe" ? (
            <StripeCheckout
              cartItems={items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
              }))}
            />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <p className="text-lg">
                    Total a pagar: <strong className="text-2xl text-secondary">R$ {finalTotal.toFixed(2)}</strong>
                  </p>
                  <Button
                    onClick={handleMercadoPagoPayment}
                    disabled={isProcessing || !mercadoPagoAvailable}
                    size="lg"
                    className="w-full max-w-md"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Pagar com Mercado Pago
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Você será redirecionado para o Mercado Pago para completar o pagamento
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="João"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Silva"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao.silva@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  required
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  placeholder="Rua das Flores"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="123"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    placeholder="Apto 45"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Centro"
                    required
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="São Paulo"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  placeholder="SP"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      <p className="text-sm font-semibold text-secondary">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? <span className="text-accent">Grátis</span> : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-secondary">R$ {finalTotal.toFixed(2)}</span>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Lock className="mr-2 h-5 w-5" />
                  Continuar para Pagamento
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
