"use client"

import type { Offer } from "@/types/offer"
import { onCardClick, formatPriceKwh, formatMoneyEur } from "@/lib/offers"
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
        "group flex h-full w-full flex-col rounded-[10px] border bg-card text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isCheapest
          ? "border-l-[3px] border-l-[var(--accent2)] border-t-border border-r-border border-b-border"
          : "border-border hover:border-primary"
      )}
      aria-label={`${offer.supplierName} – ${offer.planName}, ${formatPriceKwh(offer.priceEurKwh)} uz kWh`}
    >
      {/* Header: supplier + price */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex min-w-0 flex-col gap-0.5">
          {isCheapest && (
            <span className="mb-0.5 text-[11px] font-semibold tracking-wide text-[var(--accent2)]">
              {"Pigiausias siu metu"}
            </span>
          )}
          <span className="truncate text-sm font-bold text-card-foreground">
            {offer.supplierName}
          </span>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-xl font-bold tracking-tight text-card-foreground">
            {formatPriceKwh(offer.priceEurKwh)}
          </span>
          <span className="text-[11px] text-muted-foreground">{"uz kWh"}</span>
        </div>
      </div>

      {/* Body: fixed-rhythm rows */}
      <div className="flex flex-1 flex-col px-5 pt-3">
        {/* Row 1: Plan name */}
        <p className="line-clamp-1 min-h-[20px] text-sm text-muted-foreground">
          {offer.planName}
        </p>

        {/* Row 2: Monthly fee */}
        <div className="mt-2 min-h-[20px]">
          {offer.monthlyFeeEur > 0 ? (
            <p className="text-sm text-muted-foreground">
              {"+ "}{formatMoneyEur(offer.monthlyFeeEur)}{" / men."}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground opacity-0" aria-hidden="true">
              {"+ 0.00 \u20AC / men."}
            </p>
          )}
        </div>

        {/* Row 3: Type + term */}
        <p className="mt-2 min-h-[20px] text-xs text-muted-foreground">
          {offer.planType === "fixed" ? "Fiksuota" : "Kintama (birza)"}
          {offer.termMonths ? ` \u2022 ${offer.termMonths} men.` : ""}
        </p>
      </div>

      {/* Footer: CTA pinned to bottom */}
      <div className="mt-auto px-5 pb-5 pt-4">
        <span
          className={cn(
            "flex h-10 w-full items-center justify-center gap-2 rounded-md border border-primary text-sm font-medium text-primary transition-colors",
            "group-hover:bg-primary group-hover:text-primary-foreground"
          )}
        >
          {"Eiti i tiekejo puslapi"}
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </button>
  )
}
