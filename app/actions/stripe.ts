"use server"

import { stripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"

export async function createStripeCheckoutSession(cartItems: Array<{ id: string; quantity: number }>) {
  const lineItems = cartItems.map((item) => {
    const product = getProductById(item.id)
    if (!product) {
      throw new Error(`Product with id "${item.id}" not found`)
    }

    return {
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
  })

  return session.client_secret
}
