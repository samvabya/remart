"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { AddressBook } from "@/components/address-book"
import { useAuth } from "@/lib/auth-context"

export default function AddressesPage() {
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, state.isLoading, router])

  if (!state.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DashboardNav />
            </div>
          </div>

          <div className="lg:col-span-3">
            <AddressBook />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
