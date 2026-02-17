"use client"

import { useState, useMemo } from "react"
import type { Offer, PlanType, TermMonths } from "@/types/offer"
import { sortOffersByEffectivePrice } from "@/lib/offers"
import { CheapestHighlight } from "@/components/cheapest-highlight"
import { OfferCard } from "@/components/offer-card"
import { FiltersRow } from "@/components/filters-row"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface OffersListProps {
  offers: Offer[]
}

export function OffersList({ offers }: OffersListProps) {
  const [planType, setPlanType] = useState<PlanType | "all">("all")
  const [term, setTerm] = useState<TermMonths | "all">("all")

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

  const cheapest = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground" aria-label="Reitingavimo informacija">
              <Info className="size-3.5" />
              <span>{"Kaip reitinguojame?"}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>
              {"Reitingavimas paremtas supaprastinta formule: kaina/kWh + (mėnesinis mokestis ÷ 100). Tai apytikslė tvarka – prieš pasirašydami sutartį, patikrinkite sąlygas pas tiekėją."}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Cheapest highlight */}
      {cheapest && <CheapestHighlight offer={cheapest} />}

      {/* Remaining offers */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-3">
          {rest.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} rank={i + 2} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {"Pasiūlymų nerasta pagal pasirinktus filtrus."}
        </div>
      )}
    </div>
  )
}
