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
        "group relative flex w-full flex-col rounded-2xl border bg-card p-5 text-left transition-all md:p-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D2E] focus-visible:ring-offset-2",
        isCheapest
          ? "border-l-4 border-l-[#0F3D2E] border-t-border border-r-border border-b-border"
          : "border-border hover:border-[#0F3D2E] hover:shadow-md"
      )}
      aria-label={`${offer.supplierName} – ${offer.planName}: €${offer.priceEurKwh.toFixed(3)} uz kWh. Eiti i tiekejo puslapi.`}
    >
      {/* Cheapest label */}
      {isCheapest && (
        <span className="mb-3 text-xs font-semibold text-[#0F3D2E]">
          {"Pigiausias siu metu"}
        </span>
      )}

      {/* Top: supplier + price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-foreground">{offer.supplierName}</span>
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
        <p className="mt-2 text-sm text-muted-foreground">
          {"+ "}{offer.monthlyFeeEur.toFixed(2)}{" \u20AC / men."}
        </p>
      )}

      {/* Badge + term */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground">
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
            "flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-[#FFFFFF] transition-colors",
            "group-hover:bg-[#145C43]"
          )}
        >
          {"Eiti i tiekejo puslapi"}
          <ExternalLink className="size-4" />
        </span>
      </div>
    </button>
  )
}
