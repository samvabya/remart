"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductReviews } from "@/components/product-reviews"
import { ProductSpecifications } from "@/components/product-specifications"
import { RelatedProducts } from "@/components/related-products"
import { useCart } from "@/lib/cart-context"

// Mock product data
const product = {
  id: "1",
  name: "Wireless Bluetooth Headphones Premium",
  price: 79.99,
  originalPrice: 99.99,
  rating: 4.5,
  reviews: 128,
  inStock: true,
  images: [
    "/wireless-bluetooth-headphones.png",
    "/headphones-side-view.png",
    "/headphones-folded.png",
    "/headphones-case.png",
  ],
  description:
    "Experience premium sound quality with our latest wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charge: 5 min = 2 hours playback",
    "Premium comfort padding",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone for calls",
  ],
  specifications: [
    { label: "Driver Size", value: "40mm" },
    { label: "Frequency Response", value: "20Hz - 20kHz" },
    { label: "Impedance", value: "32 Ohm" },
    { label: "Battery Life", value: "30 hours" },
    { label: "Charging Time", value: "2 hours" },
    { label: "Weight", value: "250g" },
    { label: "Connectivity", value: "Bluetooth 5.0, 3.5mm jack" },
    { label: "Warranty", value: "2 years" },
  ],
}

const reviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation works great and the battery life is amazing. Highly recommend!",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    author: "Mike Chen",
    rating: 4,
    date: "1 month ago",
    title: "Great value for money",
    content:
      "Good build quality and comfortable to wear for long periods. The sound is clear and bass is decent. Only minor complaint is the case could be smaller.",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    author: "Emily Davis",
    rating: 5,
    date: "3 weeks ago",
    title: "Perfect for work from home",
    content:
      "The noise cancellation is perfect for blocking out distractions while working. Call quality is crystal clear too.",
    helpful: 15,
    verified: true,
  },
]

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        },
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-destructive">20% OFF</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1" size="lg" disabled={!product.inStock} onClick={addToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="secondary" className="w-full" size="lg">
                Buy Now
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $50</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">2 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full coverage</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy returns</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="reviews" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews reviews={reviews} averageRating={product.rating} totalReviews={product.reviews} />
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <ProductSpecifications specifications={product.specifications} />
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <RelatedProducts />
      </main>

      <Footer />
    </div>
  )
}
