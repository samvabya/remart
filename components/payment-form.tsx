"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCheckout } from "@/lib/checkout-context"

export function PaymentForm() {
  const { state, dispatch } = useCheckout()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!state.paymentMethod.type) {
      newErrors.type = "Please select a payment method"
    }

    if (state.paymentMethod.type === "card") {
      if (!state.paymentMethod.cardNumber) newErrors.cardNumber = "Card number is required"
      if (!state.paymentMethod.expiryDate) newErrors.expiryDate = "Expiry date is required"
      if (!state.paymentMethod.cvv) newErrors.cvv = "CVV is required"
      if (!state.paymentMethod.cardholderName) newErrors.cardholderName = "Cardholder name is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    dispatch({ type: "SET_STEP", payload: 2 })
  }

  const updateField = (field: string, value: string) => {
    dispatch({ type: "UPDATE_PAYMENT", payload: { [field]: value } })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const goBack = () => {
    dispatch({ type: "SET_STEP", payload: 0 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Select Payment Method</Label>
            <RadioGroup value={state.paymentMethod.type || ""} onValueChange={(value) => updateField("type", value)}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  <span>PayPal</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="apple_pay" id="apple_pay" />
                <Label htmlFor="apple_pay" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <Smartphone className="h-5 w-5" />
                  <span>Apple Pay</span>
                </Label>
              </div>
            </RadioGroup>
            {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
          </div>

          {state.paymentMethod.type === "card" && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={state.paymentMethod.cardholderName || ""}
                  onChange={(e) => updateField("cardholderName", e.target.value)}
                  className={errors.cardholderName ? "border-destructive" : ""}
                />
                {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={state.paymentMethod.cardNumber || ""}
                  onChange={(e) => updateField("cardNumber", e.target.value)}
                  className={errors.cardNumber ? "border-destructive" : ""}
                />
                {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={state.paymentMethod.expiryDate || ""}
                    onChange={(e) => updateField("expiryDate", e.target.value)}
                    className={errors.expiryDate ? "border-destructive" : ""}
                  />
                  {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={state.paymentMethod.cvv || ""}
                    onChange={(e) => updateField("cvv", e.target.value)}
                    className={errors.cvv ? "border-destructive" : ""}
                  />
                  {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={goBack} className="flex-1 bg-transparent">
              Back to Shipping
            </Button>
            <Button type="submit" className="flex-1">
              Review Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
