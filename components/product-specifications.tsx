import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Specification {
  label: string
  value: string
}

interface ProductSpecificationsProps {
  specifications: Specification[]
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-border/50 last:border-b-0">
              <span className="font-medium text-muted-foreground">{spec.label}</span>
              <span className="text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
