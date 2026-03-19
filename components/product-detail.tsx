"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Truck, Shield, ArrowLeft } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { useState } from "react"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/produtos"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-secondary px-3 py-1 rounded-full bg-secondary/10">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="text-sm font-medium text-accent px-3 py-1 rounded-full bg-accent/10">Em estoque</span>
              ) : (
                <span className="text-sm font-medium text-destructive px-3 py-1 rounded-full bg-destructive/10">
                  Fora de estoque
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.rating} de 5)</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-b border-border py-6">
            <p className="text-4xl font-bold text-secondary">R$ {product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium text-foreground">
                Quantidade:
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 text-center px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                />
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {added ? "Adicionado ao carrinho!" : "Adicionar ao Carrinho"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Frete Grátis</h3>
                  <p className="text-sm text-muted-foreground">Em compras acima de R$ 200</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Compra Segura</h3>
                  <p className="text-sm text-muted-foreground">Proteção total garantida</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
