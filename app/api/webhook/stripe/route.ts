import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object
      console.log("[v0] Payment successful:", session.id)
      // TODO: Save order to database, send confirmation email
      break

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object
      console.log("[v0] PaymentIntent successful:", paymentIntent.id)
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object
      console.log("[v0] Payment failed:", failedPayment.id)
      break

    default:
      console.log("[v0] Unhandled event type:", event.type)
  }

  return NextResponse.json({ received: true })
}
