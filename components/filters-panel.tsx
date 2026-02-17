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
  { value: "fixed", label: "Fiksuota" },
  { value: "variable", label: "Kintama (birza)" },
]

const termOptions: { value: TermMonths | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: 12, label: "12" },
  { value: 24, label: "24" },
  { value: 36, label: "36" },
]

export function FiltersPanel({ planType, setPlanType, term, setTerm }: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Plan type */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {"Kainos tipas"}
        </span>
        <div className="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Kainos tipas">
          {planTypeOptions.map((option) => (
            <button
              key={option.value}
              role="radio"
              aria-checked={planType === option.value}
              onClick={() => setPlanType(option.value)}
              className={cn(
                "min-h-[44px] rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                planType === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary"
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
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {"Sutarties trukme"}
          </span>
          <div className="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Sutarties trukme">
            {termOptions.map((option) => (
              <button
                key={String(option.value)}
                role="radio"
                aria-checked={term === option.value}
                onClick={() => setTerm(option.value)}
                className={cn(
                  "min-h-[44px] rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                  term === option.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary"
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
