"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { getCategories, getProductsByCategory } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  selectedRatings: number[]
  onRatingChange: (ratings: number[]) => void
  showInStock: boolean
  showOutOfStock: boolean
  onStockChange: (inStock: boolean, outOfStock: boolean) => void
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedRatings,
  onRatingChange,
  showInStock,
  showOutOfStock,
  onStockChange,
}: ProductFiltersProps) {
  const categories = getCategories().map((cat) => ({
    ...cat,
    count: getProductsByCategory(cat.slug).length,
  }))

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    onCategoryChange(newCategories)
  }

  const handleRatingToggle = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating]
    onRatingChange(newRatings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.slug} className="flex items-center gap-2">
              <Checkbox
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
              />
              <Label htmlFor={category.slug} className="flex-1 cursor-pointer">
                {category.name}
              </Label>
              <span className="text-sm text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Faixa de Preço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={1000}
            step={10}
            minStepsBetweenThumbs={1}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex-1 cursor-pointer">
                {rating} estrelas ou mais
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={showInStock}
              onCheckedChange={(checked) => onStockChange(checked as boolean, showOutOfStock)}
            />
            <Label htmlFor="in-stock" className="cursor-pointer">
              Em estoque
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="out-of-stock"
              checked={showOutOfStock}
              onCheckedChange={(checked) => onStockChange(showInStock, checked as boolean)}
            />
            <Label htmlFor="out-of-stock" className="cursor-pointer">
              Fora de estoque
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
