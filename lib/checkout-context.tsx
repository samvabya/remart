"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentMethod {
  type: "card" | "paypal" | "apple_pay"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

export interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
}

interface CheckoutState {
  currentStep: number
  shippingAddress: Partial<ShippingAddress>
  paymentMethod: Partial<PaymentMethod>
  order: Order | null
  isProcessing: boolean
}

type CheckoutAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_SHIPPING"; payload: Partial<ShippingAddress> }
  | { type: "UPDATE_PAYMENT"; payload: Partial<PaymentMethod> }
  | { type: "START_PROCESSING" }
  | { type: "ORDER_SUCCESS"; payload: Order }
  | { type: "ORDER_ERROR" }
  | { type: "RESET_CHECKOUT" }

const CheckoutContext = createContext<{
  state: CheckoutState
  dispatch: React.Dispatch<CheckoutAction>
} | null>(null)

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }

    case "UPDATE_SHIPPING":
      return {
        ...state,
        shippingAddress: { ...state.shippingAddress, ...action.payload },
      }

    case "UPDATE_PAYMENT":
      return {
        ...state,
        paymentMethod: { ...state.paymentMethod, ...action.payload },
      }

    case "START_PROCESSING":
      return { ...state, isProcessing: true }

    case "ORDER_SUCCESS":
      return {
        ...state,
        order: action.payload,
        isProcessing: false,
        currentStep: 3,
      }

    case "ORDER_ERROR":
      return { ...state, isProcessing: false }

    case "RESET_CHECKOUT":
      return {
        currentStep: 0,
        shippingAddress: {},
        paymentMethod: {},
        order: null,
        isProcessing: false,
      }

    default:
      return state
  }
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, {
    currentStep: 0,
    shippingAddress: {},
    paymentMethod: {},
    order: null,
    isProcessing: false,
  })

  return <CheckoutContext.Provider value={{ state, dispatch }}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
