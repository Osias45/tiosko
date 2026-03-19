import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { getProductById, getProducts } from "@/lib/products"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const products = getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ProductDetail product={product} />
      </main>

      <Footer />
    </div>
  )
}
