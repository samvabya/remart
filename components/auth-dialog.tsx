"use client"

import type React from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForms } from "./auth-forms"
import { useState } from "react"

interface AuthDialogProps {
  children: React.ReactNode
}

export function AuthDialog({ children }: AuthDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <AuthForms onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
