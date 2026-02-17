"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import type { Offer, PlanType, TermMonths } from "@/types/offer"
import { sortOffersByEffectivePrice } from "@/lib/offers"
import { OfferCard } from "@/components/offer-card"
import { FiltersPanel } from "@/components/filters-panel"

interface OffersGridProps {
  offers: Offer[]
}

function getAdaptiveCols(count: number): number {
  if (count <= 1) return 1
  if (count === 2) return 2
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
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <FiltersPanel
        planType={planType}
        setPlanType={(type) => {
          setPlanType(type)
          if (type === "variable") setTerm("all")
        }}
        term={term}
        setTerm={setTerm}
      />

      {/* Section heading */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-foreground md:text-xl">{"Pasiulymai"}</h2>
        <span className="text-sm text-muted-foreground">{"Rodoma nuo pigiausio."}</span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid items-stretch gap-6"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {filtered.map((offer, i) => (
            <div key={offer.id} className="flex h-full">
              <OfferCard offer={offer} isCheapest={i === 0} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-secondary p-10 text-center text-sm text-muted-foreground">
          {"Pasiulymu nerasta pagal pasirinktus filtrus."}
        </div>
      )}
    </div>
  )
}
