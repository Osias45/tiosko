import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Finalizar Compra</h1>
            <p className="text-lg text-muted-foreground">Complete seus dados para concluir o pedido</p>
          </div>
        </div>

        <CheckoutForm />
      </main>

      <Footer />
    </div>
  )
}
