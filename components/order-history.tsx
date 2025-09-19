"use client"

import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockOrders = [
  {
    id: "ORD-1234567890",
    date: "2024-01-15",
    status: "delivered",
    total: 159.98,
    items: [
      { name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99 },
      { name: "Wireless Gaming Mouse", quantity: 1, price: 59.99 },
    ],
  },
  {
    id: "ORD-1234567891",
    date: "2024-01-10",
    status: "shipped",
    total: 89.99,
    items: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
  },
  {
    id: "ORD-1234567892",
    date: "2024-01-05",
    status: "processing",
    total: 199.99,
    items: [{ name: "Smart Fitness Watch", quantity: 1, price: 199.99 }],
  },
]

const statusConfig = {
  processing: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Processing" },
  shipped: { icon: Truck, color: "bg-blue-100 text-blue-800", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Delivered" },
}

export function OrderHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order History</h2>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
          const statusLabel = statusConfig[order.status as keyof typeof statusConfig].label

          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={statusColor}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Package className="mr-2 h-4 w-4" />
                      Track Order
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
