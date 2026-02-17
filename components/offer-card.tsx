"use client"

import type { Offer } from "@/types/offer"
import { onCardClick } from "@/lib/offers"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

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
        "group relative flex w-full flex-col rounded-[20px] border-2 border-border bg-card p-6 text-left transition-colors md:p-8",
        "hover:border-primary/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label={`${offer.supplierName} – ${offer.planName}: €${offer.priceEurKwh.toFixed(3)} už kWh. Eiti į tiekėjo puslapį.`}
    >
      {/* Cheapest label */}
      {isCheapest && (
        <div className="absolute -top-3.5 left-5 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
          {"Pigiausias šiuo metu"}
        </div>
      )}

      {/* Top: supplier + price */}
      <div className={cn("flex items-start justify-between gap-4", isCheapest && "mt-2")}>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold text-foreground">{offer.supplierName}</span>
          <span className="text-sm text-muted-foreground">{offer.planName}</span>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-3xl font-bold tracking-tight text-foreground">
            {"\u20AC"}{offer.priceEurKwh.toFixed(3)}
          </span>
          <span className="text-sm text-muted-foreground">{"už kWh"}</span>
        </div>
      </div>

      {/* Monthly fee line */}
      {offer.monthlyFeeEur > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {"+ "}{offer.monthlyFeeEur.toFixed(2)}{" \u20AC mėnesinis mokestis"}
        </p>
      )}

      {/* Badge */}
      <div className="mt-4">
        <span
          className={cn(
            "inline-block rounded-full border-2 px-4 py-1.5 text-sm font-medium",
            offer.planType === "fixed"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-border bg-secondary text-secondary-foreground"
          )}
        >
          {offer.planType === "fixed" ? "Fiksuota kaina" : "Kintama kaina"}
        </span>
        {offer.termMonths && (
          <span className="ml-3 text-sm text-muted-foreground">
            {offer.termMonths}{" mėn."}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <span
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors",
            "group-hover:bg-[#B86A3A]"
          )}
        >
          {"Eiti į tiekėjo puslapį"}
          <ArrowRight className="size-5" />
        </span>
      </div>
    </button>
  )
}
