"use client"

import type { PlanType, TermMonths } from "@/types/offer"
import { cn } from "@/lib/utils"

interface FiltersPanelProps {
  planType: PlanType | "all"
  setPlanType: (type: PlanType | "all") => void
  term: TermMonths | "all"
  setTerm: (term: TermMonths | "all") => void
}

const planTypeOptions: { value: PlanType | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: "fixed", label: "Fiksuota kaina" },
  { value: "variable", label: "Kintama (pagal birža)" },
]

const termOptions: { value: TermMonths | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: 12, label: "12 menesių" },
  { value: 24, label: "24 menesiai" },
  { value: 36, label: "36 menesiai" },
]

export function FiltersPanel({ planType, setPlanType, term, setTerm }: FiltersPanelProps) {
  return (
    <div className="rounded-[20px] border border-[#B86A3A]/30 bg-card px-5 py-6 md:px-8 md:py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Plan type */}
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-semibold text-foreground">{"Kainos tipas"}</span>
          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Kainos tipas">
            {planTypeOptions.map((option) => (
              <button
                key={option.value}
                role="radio"
                aria-checked={planType === option.value}
                onClick={() => setPlanType(option.value)}
                className={cn(
                  "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  planType === option.value
                    ? "bg-primary text-primary-foreground"
                    : "border border-[#B86A3A]/60 text-[#3B2F2A] hover:border-primary"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Term filter */}
        {planType !== "variable" && (
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-foreground">{"Sutarties trukme"}</span>
            <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Sutarties trukme">
              {termOptions.map((option) => (
                <button
                  key={String(option.value)}
                  role="radio"
                  aria-checked={term === option.value}
                  onClick={() => setTerm(option.value)}
                  className={cn(
                    "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                    term === option.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-[#B86A3A]/60 text-[#3B2F2A] hover:border-primary"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
