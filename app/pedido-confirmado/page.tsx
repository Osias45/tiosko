import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmedPage() {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pedido Confirmado!</h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Obrigado pela sua compra! Seu pedido foi confirmado e está sendo processado.
              </p>

              <div className="p-6 rounded-lg bg-muted/50 border border-border mb-8">
                <p className="text-sm text-muted-foreground mb-2">Número do Pedido</p>
                <p className="text-2xl font-bold text-foreground">#{orderNumber}</p>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Acompanhe seu pedido</h3>
                    <p className="text-sm text-muted-foreground">
                      Enviamos um e-mail com os detalhes do pedido e o código de rastreamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    <Home className="mr-2 h-5 w-5" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Link href="/produtos" className="flex-1">
                  <Button size="lg" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
