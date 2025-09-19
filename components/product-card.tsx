"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

export function ProductCard({ id, name, price, originalPrice, image, rating, reviews, badge }: ProductCardProps) {
  const { dispatch } = useCart()

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking add to cart
    dispatch({
      type: "ADD_ITEM",
      payload: { id, name, price, image },
    })
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge && <Badge className="absolute top-2 left-2 bg-destructive">{badge}</Badge>}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{name}</h3>

          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">${price}</span>
            {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
