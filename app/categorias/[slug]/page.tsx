import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProductsByCategory, getCategoryBySlug } from "@/lib/products"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(params.slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Início
                </Link>
                {" / "}
                <Link href="/categorias" className="hover:text-foreground transition-colors">
                  Categorias
                </Link>
                {" / "}
                <span className="text-foreground">{category.name}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{category.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{category.description}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">Nenhum produto encontrado nesta categoria</p>
                <Link href="/produtos">
                  <Button>Ver Todos os Produtos</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow flex flex-col">
                    <CardContent className="p-4 flex flex-col flex-1">
                      <Link href={`/produtos/${product.id}`} className="block mb-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

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

                      <Link href={`/produtos/${product.id}`}>
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-secondary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{product.description}</p>

                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <p className="text-2xl font-bold text-secondary">R$ {product.price.toFixed(2)}</p>
                        <Link href={`/produtos/${product.id}`}>
                          <Button size="sm" className="gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Ver
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
