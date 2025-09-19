import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Electronics",
    image: "/electronics-category.png",
    count: "1,234 items",
  },
  {
    name: "Fashion",
    image: "/fashion-category.png",
    count: "856 items",
  },
  {
    name: "Home & Garden",
    image: "/home-garden-category.png",
    count: "642 items",
  },
  {
    name: "Sports",
    image: "/sports-collage.png",
    count: "423 items",
  },
  {
    name: "Books",
    image: "/books-category.png",
    count: "789 items",
  },
  {
    name: "Beauty",
    image: "/beauty-category.png",
    count: "567 items",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="group cursor-pointer transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="mb-3">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
