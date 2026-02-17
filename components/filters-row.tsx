"use client"

import type { PlanType, TermMonths } from "@/types/offer"
import { cn } from "@/lib/utils"

interface FiltersRowProps {
  planType: PlanType | "all"
  setPlanType: (type: PlanType | "all") => void
  term: TermMonths | "all"
  setTerm: (term: TermMonths | "all") => void
}

const planTypeOptions: { value: PlanType | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: "fixed", label: "Fiksuota kaina" },
  { value: "variable", label: "Kintama (pagal biržą)" },
]

const termOptions: { value: TermMonths | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: 12, label: "12 mėnesių" },
  { value: 24, label: "24 mėnesiai" },
  { value: 36, label: "36 mėnesiai" },
]

export function FiltersRow({ planType, setPlanType, term, setTerm }: FiltersRowProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Plan type */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-foreground">{"Kainos tipas"}</span>
        <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Kainos tipas">
          {planTypeOptions.map((option) => (
            <button
              key={option.value}
              role="radio"
              aria-checked={planType === option.value}
              onClick={() => setPlanType(option.value)}
              className={cn(
                "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-colors",
                planType === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-secondary-foreground hover:border-primary/50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Term filter */}
      {planType !== "variable" && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground">{"Sutarties trukmė"}</span>
          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Sutarties trukmė">
            {termOptions.map((option) => (
              <button
                key={String(option.value)}
                role="radio"
                aria-checked={term === option.value}
                onClick={() => setTerm(option.value)}
                className={cn(
                  "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-colors",
                  term === option.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-secondary-foreground hover:border-primary/50"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
