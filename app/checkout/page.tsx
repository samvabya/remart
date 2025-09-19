"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutSteps } from "@/components/checkout-steps"
import { ShippingForm } from "@/components/shipping-form"
import { PaymentForm } from "@/components/payment-form"
import { OrderReview } from "@/components/order-review"
import { OrderConfirmation } from "@/components/order-confirmation"
import { CheckoutProvider, useCheckout } from "@/lib/checkout-context"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { AuthDialog } from "@/components/auth-dialog"
import { Button } from "@/components/ui/button"

function CheckoutContent() {
  const { state: checkoutState } = useCheckout()
  const { state: authState } = useAuth()
  const { state: cartState } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (cartState.items.length === 0 && checkoutState.currentStep < 3) {
      router.push("/")
    }
  }, [cartState.items.length, checkoutState.currentStep, router])

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Sign in to continue</h1>
          <p className="text-muted-foreground">You need to be signed in to proceed with checkout</p>
          <AuthDialog>
            <Button>Sign In</Button>
          </AuthDialog>
        </div>
      </div>
    )
  }

  if (cartState.items.length === 0 && checkoutState.currentStep < 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to your cart before checking out</p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (checkoutState.currentStep) {
      case 0:
        return <ShippingForm />
      case 1:
        return <PaymentForm />
      case 2:
        return <OrderReview />
      case 3:
        return <OrderConfirmation />
      default:
        return <ShippingForm />
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <CheckoutSteps currentStep={checkoutState.currentStep} />

        {renderStep()}
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="min-h-screen">
        <Header />
        <CheckoutContent />
        <Footer />
      </div>
    </CheckoutProvider>
  )
}
