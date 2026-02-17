"use client"

import type { Offer } from "@/types/offer"
import { onCardClick } from "@/lib/offers"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface OfferCardProps {
  offer: Offer
  isCheapest?: boolean
}

export function OfferCard({ offer, isCheapest = false }: OfferCardProps) {
  const handleClick = () => {
    onCardClick(offer.id, offer.supplierName)
    window.open(offer.redirectUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative flex w-full flex-col rounded-[20px] border bg-card p-5 text-left transition-all md:p-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isCheapest
          ? "border-primary shadow-sm"
          : "border-[#B86A3A]/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-primary hover:-translate-y-0.5 hover:shadow-md"
      )}
      aria-label={`${offer.supplierName} – ${offer.planName}: €${offer.priceEurKwh.toFixed(3)} uz kWh. Eiti i tiekejo puslapi.`}
    >
      {/* Cheapest label */}
      {isCheapest && (
        <div className="absolute -top-3 left-4 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-primary-foreground">
          {"Pigiausias siu metu"}
        </div>
      )}

      {/* Top: supplier + price */}
      <div className={cn("flex items-start justify-between gap-3", isCheapest && "mt-1.5")}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-foreground md:text-lg">{offer.supplierName}</span>
          <span className="truncate text-sm text-muted-foreground">{offer.planName}</span>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {"\u20AC"}{offer.priceEurKwh.toFixed(3)}
          </span>
          <span className="text-xs text-muted-foreground">{"uz kWh"}</span>
        </div>
      </div>

      {/* Monthly fee */}
      {offer.monthlyFeeEur > 0 && (
        <p className="mt-2.5 text-sm text-muted-foreground">
          {"+ "}{offer.monthlyFeeEur.toFixed(2)}{" \u20AC / men."}
        </p>
      )}

      {/* Badge + term */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            "inline-block rounded-full px-3.5 py-1.5 text-xs font-medium",
            offer.planType === "fixed"
              ? "bg-accent/15 text-accent"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {offer.planType === "fixed" ? "Fiksuota kaina" : "Kintama (birza)"}
        </span>
        {offer.termMonths && (
          <span className="text-sm text-muted-foreground">
            {offer.termMonths}{" men."}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5">
        <span
          className={cn(
            "flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors",
            "group-hover:bg-[#B86A3A]"
          )}
        >
          {"Eiti i tiekejo puslapi"}
          <ExternalLink className="size-4" />
        </span>
      </div>
    </button>
  )
}
