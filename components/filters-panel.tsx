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
  { value: "variable", label: "Kintama (birza)" },
]

const termOptions: { value: TermMonths | "all"; label: string }[] = [
  { value: "all", label: "Visi" },
  { value: 12, label: "12 menesiu" },
  { value: 24, label: "24 menesiai" },
  { value: 36, label: "36 menesiai" },
]

export function FiltersPanel({ planType, setPlanType, term, setTerm }: FiltersPanelProps) {
  return (
    <div className="rounded-xl bg-secondary px-5 py-6 md:px-8 md:py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        {/* Plan type */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{"Kainos tipas"}</span>
          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Kainos tipas">
            {planTypeOptions.map((option) => (
              <button
                key={option.value}
                role="radio"
                aria-checked={planType === option.value}
                onClick={() => setPlanType(option.value)}
                className={cn(
                  "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                  planType === option.value
                    ? "bg-[#0F3D2E] text-[#FFFFFF]"
                    : "border border-border bg-background text-foreground hover:border-[#0F3D2E]/40"
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
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{"Sutarties trukme"}</span>
            <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Sutarties trukme">
              {termOptions.map((option) => (
                <button
                  key={String(option.value)}
                  role="radio"
                  aria-checked={term === option.value}
                  onClick={() => setTerm(option.value)}
                  className={cn(
                    "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                    term === option.value
                      ? "bg-[#0F3D2E] text-[#FFFFFF]"
                      : "border border-border bg-background text-foreground hover:border-[#0F3D2E]/40"
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
