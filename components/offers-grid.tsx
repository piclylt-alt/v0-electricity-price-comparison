"use client"

import { useMemo, useEffect, useCallback, useState } from "react"
import type { Offer, PlanType, TermMonths } from "@/types/offer"
import { sortOffersByEffectivePrice } from "@/lib/offers"
import { OfferCard } from "@/components/offer-card"

interface OffersGridProps {
  offers: Offer[]
  planType: PlanType | "all"
  term: TermMonths | "all"
}

function getAdaptiveCols(count: number): number {
  if (count <= 2) return Math.max(count, 1)
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

export function OffersGrid({ offers, planType, term }: OffersGridProps) {
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
    <div className="flex flex-col gap-5">
      {/* Section heading */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-foreground">{"Pasiulymai"}</h2>
        <span className="text-xs text-muted-foreground">{"Rodoma nuo pigiausio."}</span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid items-stretch gap-4"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {filtered.map((offer, i) => (
            <div key={offer.id} className="flex">
              <OfferCard offer={offer} isCheapest={i === 0} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[10px] border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {"Pasiulymu nerasta pagal pasirinktus filtrus."}
        </div>
      )}
    </div>
  )
}
