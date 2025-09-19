import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/wireless-bluetooth-headphones.png",
    rating: 4.5,
    reviews: 128,
    badge: "20% OFF",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch.png",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "3",
    name: "Portable Phone Charger",
    price: 29.99,
    originalPrice: 39.99,
    image: "/portable-phone-charger.png",
    rating: 4.3,
    reviews: 256,
    badge: "SALE",
  },
  {
    id: "4",
    name: "Wireless Gaming Mouse",
    price: 59.99,
    image: "/wireless-gaming-mouse.png",
    rating: 4.6,
    reviews: 94,
  },
  {
    id: "5",
    name: "USB-C Hub Adapter",
    price: 49.99,
    originalPrice: 69.99,
    image: "/usb-c-hub-adapter.png",
    rating: 4.4,
    reviews: 167,
    badge: "NEW",
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "/bluetooth-speaker.png",
    rating: 4.7,
    reviews: 203,
  },
  {
    id: "7",
    name: "Laptop Stand",
    price: 39.99,
    originalPrice: 49.99,
    image: "/laptop-stand.png",
    rating: 4.2,
    reviews: 145,
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    price: 24.99,
    image: "/wireless-charging-pad.png",
    rating: 4.5,
    reviews: 312,
  },
]

export function ProductGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the best products at amazing prices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
