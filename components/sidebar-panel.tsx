"use client"

import type { PlanType, TermMonths } from "@/types/offer"
import { ThemeToggle } from "@/components/theme-toggle"
import { FiltersPanel } from "@/components/filters-panel"
import { Calendar, Zap } from "lucide-react"

interface SidebarPanelProps {
  planType: PlanType | "all"
  setPlanType: (type: PlanType | "all") => void
  term: TermMonths | "all"
  setTerm: (term: TermMonths | "all") => void
  lastUpdated: string
}

export function SidebarPanel({
  planType,
  setPlanType,
  term,
  setTerm,
  lastUpdated,
}: SidebarPanelProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-0 rounded-[10px] border border-border bg-card lg:w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded bg-primary">
            <Zap className="size-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">{"elektrosplanai.lt"}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#kaip-veikia"
            className="hidden text-xs text-muted-foreground transition-colors hover:text-primary hover:underline sm:inline"
          >
            {"Kaip tai veikia"}
          </a>
          <a
            href="#kontaktai"
            className="hidden text-xs text-muted-foreground transition-colors hover:text-primary hover:underline sm:inline"
          >
            {"Kontaktai"}
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border px-5 py-5">
        <FiltersPanel
          planType={planType}
          setPlanType={setPlanType}
          term={term}
          setTerm={setTerm}
        />
      </div>

      {/* Help text */}
      <div className="flex flex-col gap-3 px-5 py-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {"Pasirink filtrus ir spausk plana \u2014 atsidarys tiekejo puslapis."}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>{"Atnaujinta: "}{lastUpdated}</span>
        </div>
      </div>
    </aside>
  )
}
