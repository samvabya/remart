import { CheckCircle, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCheckout } from "@/lib/checkout-context"
import Link from "next/link"

export function OrderConfirmation() {
  const { state } = useCheckout()

  if (!state.order) return null

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Number:</span>
            <span className="font-mono">{state.order.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Order Date:</span>
            <span>{state.order.createdAt.toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-lg">${state.order.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Status:</span>
            <span className="capitalize bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              {state.order.status}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to {state.order.shippingAddress.email}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>

          <Link href="/">
            <Button>
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
