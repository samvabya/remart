"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCheckout } from "@/lib/checkout-context"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export function OrderReview() {
  const { state: checkoutState, dispatch } = useCheckout()
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const { state: authState } = useAuth()

  const subtotal = cartState.total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = async () => {
    dispatch({ type: "START_PROCESSING" })

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order = {
      id: `ORD-${Date.now()}`,
      items: cartState.items,
      shippingAddress: checkoutState.shippingAddress as any,
      paymentMethod: checkoutState.paymentMethod as any,
      subtotal,
      shipping,
      tax,
      total,
      status: "confirmed" as const,
      createdAt: new Date(),
    }

    dispatch({ type: "ORDER_SUCCESS", payload: order })
    cartDispatch({ type: "CLEAR_CART" })
  }

  const goBack = () => {
    dispatch({ type: "SET_STEP", payload: 1 })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartState.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p className="font-medium">
                {checkoutState.shippingAddress.firstName} {checkoutState.shippingAddress.lastName}
              </p>
              <p>{checkoutState.shippingAddress.address}</p>
              <p>
                {checkoutState.shippingAddress.city}, {checkoutState.shippingAddress.state}{" "}
                {checkoutState.shippingAddress.zipCode}
              </p>
              <p>{checkoutState.shippingAddress.country}</p>
              {checkoutState.shippingAddress.phone && <p>Phone: {checkoutState.shippingAddress.phone}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {checkoutState.paymentMethod.type === "card" && (
                <p>Credit Card ending in {checkoutState.paymentMethod.cardNumber?.slice(-4)}</p>
              )}
              {checkoutState.paymentMethod.type === "paypal" && <p>PayPal</p>}
              {checkoutState.paymentMethod.type === "apple_pay" && <p>Apple Pay</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={goBack} className="flex-1 bg-transparent">
            Back to Payment
          </Button>
          <Button onClick={handlePlaceOrder} className="flex-1" disabled={checkoutState.isProcessing}>
            {checkoutState.isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
