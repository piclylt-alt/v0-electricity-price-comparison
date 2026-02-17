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
  { value: "fixed", label: "Fiksuota" },
  { value: "variable", label: "Kintama" },
]

const termOptions: { value: TermMonths | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: 12, label: "12 mėn." },
  { value: 24, label: "24 mėn." },
  { value: 36, label: "36 mėn." },
]

export function FiltersRow({ planType, setPlanType, term, setTerm }: FiltersRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Plan type toggle */}
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Plano tipas">
        {planTypeOptions.map((option) => (
          <button
            key={option.value}
            role="radio"
            aria-checked={planType === option.value}
            onClick={() => setPlanType(option.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              planType === option.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Term filter - only show when not variable */}
      {planType !== "variable" && (
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Sutarties trukmė">
          {termOptions.map((option) => (
            <button
              key={String(option.value)}
              role="radio"
              aria-checked={term === option.value}
              onClick={() => setTerm(option.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                term === option.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
