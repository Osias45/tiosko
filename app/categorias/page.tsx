import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories, getProductsByCategory } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"

export default function CategoriasPage() {
  const categories = getCategories()

  const categoriesWithImages = [
    {
      slug: "eletronicos",
      image: "/electronics-components.png",
    },
    {
      slug: "casa",
      image: "/cozy-living-room.png",
    },
    {
      slug: "moda",
      image: "/diverse-fashion-collection.png",
    },
    {
      slug: "esportes",
      image: "/diverse-group-playing-various-sports.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Explore Nossas Categorias
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Encontre exatamente o que você procura navegando por nossas categorias cuidadosamente selecionadas
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => {
                const imageData = categoriesWithImages.find((c) => c.slug === category.slug)
                const productCount = getProductsByCategory(category.slug).length

                return (
                  <Link key={category.slug} href={`/categorias/${category.slug}`}>
                    <Card className="group hover:shadow-lg transition-all overflow-hidden h-full">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="aspect-square md:aspect-auto relative overflow-hidden">
                            <Image
                              src={imageData?.image || "/placeholder.svg"}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{category.name}</h2>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                            <p className="text-sm text-secondary font-semibold">
                              {productCount} {productCount === 1 ? "produto" : "produtos"} disponíveis
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
