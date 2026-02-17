"use client"

import type { Offer } from "@/types/offer"
import { onCardClick } from "@/lib/offers"
import { Badge } from "@/components/ui/badge"
import { Zap, ExternalLink } from "lucide-react"

interface CheapestHighlightProps {
  offer: Offer
}

export function CheapestHighlight({ offer }: CheapestHighlightProps) {
  const handleClick = () => {
    onCardClick(offer.id, offer.supplierName)
    window.open(offer.redirectUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="group relative w-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 text-left transition-colors hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-6"
      aria-label={`Pigiausia: ${offer.supplierName} – ${offer.planName}: €${offer.priceEurKwh.toFixed(3)}/kWh. Peržiūrėti pasiūlymą.`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {"#1 Pigiausia"}
            </span>
          </div>
          <h2 className="text-lg font-bold text-foreground md:text-xl">
            {offer.supplierName}
          </h2>
          <p className="text-sm text-muted-foreground">{offer.planName}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={offer.planType === "fixed" ? "default" : "secondary"}
              className={
                offer.planType === "fixed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              }
            >
              {offer.planType === "fixed" ? "FIKSUOTA" : "KINTAMA"}
            </Badge>
            {offer.termMonths && (
              <span className="text-xs text-muted-foreground">
                {offer.termMonths}{" mėn."}
              </span>
            )}
            {offer.monthlyFeeEur > 0 && (
              <span className="text-xs text-muted-foreground">
                {"· "}{offer.monthlyFeeEur.toFixed(2)}{" €/mėn."}
              </span>
            )}
          </div>
          {offer.notes && (
            <p className="text-xs text-muted-foreground/70">{offer.notes}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-bold text-foreground md:text-3xl">
            {"€"}{offer.priceEurKwh.toFixed(3)}
          </span>
          <span className="text-sm text-muted-foreground">{"/kWh"}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
        <span>{"Peržiūrėti pasiūlymą"}</span>
        <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  )
}
