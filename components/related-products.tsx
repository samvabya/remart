import { ProductCard } from "./product-card"

const relatedProducts = [
  {
    id: "r1",
    name: "Wireless Earbuds Pro",
    price: 129.99,
    image: "/wireless-earbuds-pro.png",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "r2",
    name: "Noise Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    image: "/noise-cancelling-headphones.png",
    rating: 4.8,
    reviews: 156,
    badge: "SALE",
  },
  {
    id: "r3",
    name: "Gaming Headset RGB",
    price: 89.99,
    image: "/gaming-headset-rgb.png",
    rating: 4.4,
    reviews: 203,
  },
  {
    id: "r4",
    name: "Studio Monitor Headphones",
    price: 179.99,
    image: "/studio-monitor-headphones.png",
    rating: 4.7,
    reviews: 94,
  },
]

export function RelatedProducts() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
