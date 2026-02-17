"use client"

import type { Offer } from "@/types/offer"
import { onCardClick } from "@/lib/offers"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface OfferCardProps {
  offer: Offer
  rank: number
}

export function OfferCard({ offer, rank }: OfferCardProps) {
  const handleClick = () => {
    onCardClick(offer.id, offer.supplierName)
    window.open(offer.redirectUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left text-card-foreground transition-colors hover:border-primary/30 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-5"
      aria-label={`${offer.supplierName} – ${offer.planName}: €${offer.priceEurKwh.toFixed(3)}/kWh. Peržiūrėti pasiūlymą.`}
    >
      {/* Rank */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground md:size-9 md:text-sm">
        {"#"}{rank}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-foreground md:text-base">
            {offer.supplierName}
          </span>
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
        </div>
        <span className="text-xs text-muted-foreground md:text-sm">
          {offer.planName}
          {offer.termMonths && (
            <span className="ml-1">
              {"· "}{offer.termMonths}{" mėn."}
            </span>
          )}
          {offer.monthlyFeeEur > 0 && (
            <span className="ml-1">
              {"· "}{offer.monthlyFeeEur.toFixed(2)}{" €/mėn."}
            </span>
          )}
        </span>
        {offer.notes && (
          <span className="text-xs text-muted-foreground/70">{offer.notes}</span>
        )}
      </div>

      {/* Price */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-lg font-bold text-foreground md:text-xl">
          {"€"}{offer.priceEurKwh.toFixed(3)}
        </span>
        <span className="text-xs text-muted-foreground">{"/kWh"}</span>
      </div>

      {/* Arrow */}
      <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
    </button>
  )
}
