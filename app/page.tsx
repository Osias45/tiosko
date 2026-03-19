import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Package, Truck, Shield, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = [
    {
      id: "1",
      name: "Fone de Ouvido Bluetooth",
      price: 199.9,
      image: "/wireless-headphones.png",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Smart Watch Fitness",
      price: 349.9,
      image: "/smartwatch-lifestyle.png",
      rating: 4.8,
    },
    {
      id: "3",
      name: "Câmera de Segurança WiFi",
      price: 279.9,
      image: "/outdoor-security-camera.png",
      rating: 4.6,
    },
    {
      id: "4",
      name: "Teclado Mecânico RGB",
      price: 429.9,
      image: "/mechanical-keyboard.png",
      rating: 4.7,
    },
  ]

  const categories = [
    { name: "Eletrônicos", image: "/electronics-components.png", href: "/categorias/eletronicos" },
    { name: "Casa & Decoração", image: "/cozy-living-room.png", href: "/categorias/casa" },
    { name: "Moda", image: "/diverse-fashion-collection.png", href: "/categorias/moda" },
    { name: "Esportes", image: "/diverse-group-playing-various-sports.png", href: "/categorias/esportes" },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Em compras acima de R$ 200",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Proteção total em suas compras",
    },
    {
      icon: Package,
      title: "Entrega Rápida",
      description: "Receba em até 7 dias úteis",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-muted/50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Descubra produtos incríveis com os melhores preços
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Encontre tudo o que você precisa em um só lugar. Qualidade, variedade e economia garantidas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/produtos">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ver Produtos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/categorias">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Explorar Categorias
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Produtos em Destaque</h2>
                <p className="text-muted-foreground">Selecionamos os melhores produtos para você</p>
              </div>
              <Link href="/produtos">
                <Button variant="ghost">
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/produtos/${product.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-2xl font-bold text-secondary">R$ {product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore por Categoria</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Encontre exatamente o que você procura navegando por nossas categorias
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <Link key={index} href={category.href}>
                  <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="bg-secondary text-secondary-foreground overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Cadastre-se e ganhe 10% de desconto</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Receba ofertas exclusivas, novidades e promoções direto no seu e-mail
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground"
                    />
                    <Button size="lg" variant="outline" className="bg-background hover:bg-background/90">
                      Cadastrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
