"use client"

import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { CartDrawer } from "./cart-drawer"
import { useAuth } from "@/lib/auth-context"
import { UserMenu } from "./user-menu"
import { AuthDialog } from "./auth-dialog"

export function Header() {
  const { state: cartState } = useCart()
  const { state: authState } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">remart</h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>
                  {authState.isAuthenticated ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{authState.user?.name}</p>
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                    </div>
                  ) : (
                    <AuthDialog>
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </AuthDialog>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Account - Updated to show user menu or auth dialog */}
            <div className="hidden md:flex">
              {authState.isAuthenticated ? (
                <UserMenu />
              ) : (
                <AuthDialog>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </AuthDialog>
              )}
            </div>

            {/* Cart */}
            <CartDrawer>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>
            </CartDrawer>
          </div>
        </div>
      </div>
    </header>
  )
}
