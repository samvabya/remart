"use client"

import { useState } from "react"
import { Heart, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"

const mockWishlistItems = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/wireless-bluetooth-headphones.png",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch.png",
    inStock: true,
  },
  {
    id: "3",
    name: "Gaming Headset RGB",
    price: 89.99,
    image: "/gaming-headset-rgb.png",
    inStock: false,
  },
]

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const { dispatch } = useCart()

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Wishlist</h2>
        <p className="text-muted-foreground">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground text-center mb-4">
              Save items you love to your wishlist and never lose track of them
            </p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="font-bold text-primary">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm" disabled={!item.inStock} onClick={() => addToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
