"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { getProducts } from "@/lib/products"

export default function ProductsPage() {
  const allProducts = getProducts()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [showInStock, setShowInStock] = useState(true)
  const [showOutOfStock, setShowOutOfStock] = useState(true)

  const filteredProducts = allProducts.filter((product) => {
    // Filtro de categoria
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filtro de preço
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filtro de avaliação
    if (selectedRatings.length > 0) {
      const meetsRating = selectedRatings.some((rating) => product.rating >= rating)
      if (!meetsRating) return false
    }

    // Filtro de disponibilidade
    if (!showInStock && product.inStock) return false
    if (!showOutOfStock && !product.inStock) return false

    return true
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nossos Produtos</h1>
            <p className="text-lg text-muted-foreground">Explore nossa coleção completa de produtos selecionados</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedRatings={selectedRatings}
                onRatingChange={setSelectedRatings}
                showInStock={showInStock}
                showOutOfStock={showOutOfStock}
                onStockChange={(inStock, outOfStock) => {
                  setShowInStock(inStock)
                  setShowOutOfStock(outOfStock)
                }}
              />
            </aside>
            <div className="lg:col-span-3">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
