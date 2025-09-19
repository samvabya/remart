"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthForms } from "@/components/auth-forms"
import { useAuth } from "@/lib/auth-context"

export default function AuthPage() {
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/")
    }
  }, [state.isAuthenticated, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (state.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <AuthForms onSuccess={() => router.push("/")} />
    </div>
  )
}
