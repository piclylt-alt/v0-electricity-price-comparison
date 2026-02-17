"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import type { Offer, PlanType, TermMonths } from "@/types/offer"
import { sortOffersByEffectivePrice } from "@/lib/offers"
import { OfferCard } from "@/components/offer-card"
import { FiltersRow } from "@/components/filters-row"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface OffersGridProps {
  offers: Offer[]
}

function getAdaptiveCols(count: number): number {
  if (count <= 1) return 1
  if (count === 2) return 2
  if (count <= 6) return 3
  if (count <= 9) return 3
  return 3
}

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop")

  const update = useCallback(() => {
    const w = window.innerWidth
    if (w < 640) setBp("mobile")
    else if (w < 1024) setBp("tablet")
    else setBp("desktop")
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  return bp
}

export function OffersGrid({ offers }: OffersGridProps) {
  const [planType, setPlanType] = useState<PlanType | "all">("all")
  const [term, setTerm] = useState<TermMonths | "all">("all")
  const bp = useBreakpoint()

  const filtered = useMemo(() => {
    let result = offers
    if (planType !== "all") {
      result = result.filter((o) => o.planType === planType)
    }
    if (term !== "all" && planType !== "variable") {
      result = result.filter((o) => o.termMonths === term || o.planType === "variable")
    }
    return sortOffersByEffectivePrice(result)
  }, [offers, planType, term])

  const cols = useMemo(() => {
    if (bp === "mobile") return 1
    if (bp === "tablet") return 2
    return getAdaptiveCols(filtered.length)
  }, [bp, filtered.length])

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FiltersRow
          planType={planType}
          setPlanType={(type) => {
            setPlanType(type)
            if (type === "variable") setTerm("all")
          }}
          term={term}
          setTerm={setTerm}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              aria-label="Reitingavimo informacija"
            >
              <Info className="size-3.5" />
              <span>{"Kaip reitinguojame?"}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>
              {"Reitingavimas paremtas supaprastinta formule: kaina/kWh + (mėnesinis mokestis \u00f7 100). Tai apytikslė tvarka \u2013 prieš pasirašydami sutartį, patikrinkite sąlygas pas tiekėją."}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {filtered.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} rank={i + 1} isCheapest={i === 0} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {"Pasiūlymų nerasta pagal pasirinktus filtrus."}
        </div>
      )}
    </div>
  )
}
