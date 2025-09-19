import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { id: 0, name: "Shipping", description: "Delivery information" },
  { id: 1, name: "Payment", description: "Payment method" },
  { id: 2, name: "Review", description: "Order summary" },
  { id: 3, name: "Complete", description: "Order confirmation" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""}`}>
              <div className="flex items-center">
                <div className="relative flex h-8 w-8 items-center justify-center">
                  {step.id < currentStep ? (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                  ) : step.id === currentStep ? (
                    <div className="h-8 w-8 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-muted bg-background" />
                  )}
                </div>
                <div className="ml-4 min-w-0">
                  <p
                    className={`text-sm font-medium ${step.id <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="absolute top-4 left-8 -ml-px h-0.5 w-full bg-muted" aria-hidden="true">
                  <div
                    className={`h-0.5 bg-primary transition-all duration-300 ${
                      step.id < currentStep ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
