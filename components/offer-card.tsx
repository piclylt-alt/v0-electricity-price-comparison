"use client"

import type { Offer } from "@/types/offer"
import { onCardClick, formatPriceKwh, formatMoneyEur } from "@/lib/offers"
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
        "group relative flex h-full w-full flex-col rounded-xl border bg-card text-left transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D2E] focus-visible:ring-offset-2",
        isCheapest
          ? "border-l-[4px] border-l-[#0F3D2E] border-t-border border-r-border border-b-border"
          : "border-border hover:border-[#0F3D2E]/60 hover:shadow-sm"
      )}
      aria-label={`Eiti i ${offer.supplierName} puslapi – ${offer.planName}, ${formatPriceKwh(offer.priceEurKwh)} uz kWh`}
    >
      {/* ── PART 1: Header ── */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 md:px-6 md:pt-6">
        <div className="flex min-w-0 flex-col gap-0.5">
          {isCheapest && (
            <span className="mb-1 text-xs font-semibold text-[#0F3D2E]">
              {"Pigiausias \u0161iuo metu"}
            </span>
          )}
          <span className="truncate text-base font-bold text-card-foreground">
            {offer.supplierName}
          </span>
          <span className="line-clamp-1 text-sm text-muted-foreground">
            {offer.planName}
          </span>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-2xl font-bold tracking-tight text-card-foreground">
            {formatPriceKwh(offer.priceEurKwh)}
          </span>
          <span className="text-xs text-muted-foreground">{"u\u017E kWh"}</span>
        </div>
      </div>

      {/* ── PART 2: Body (fixed-rhythm reserved rows) ── */}
      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 md:px-6">
        {/* Row A: Monthly fee – always rendered for consistent height */}
        <div className="min-h-[20px]">
          {offer.monthlyFeeEur > 0 ? (
            <p className="text-sm text-muted-foreground">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">{"Men. mokestis"}</span>
              {" "}
              <span className="font-medium text-card-foreground">{"+ "}{formatMoneyEur(offer.monthlyFeeEur)}{" / men."}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground opacity-0" aria-hidden="true">
              {"+ 0.00 \u20AC / men."}
            </p>
          )}
        </div>

        {/* Row B: Type + term – always rendered */}
        <div className="flex min-h-[28px] flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {offer.planType === "fixed" ? "Fiksuota" : "Kintama (bir\u017Ea)"}
          </span>
          <span className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {offer.termMonths ? `${offer.termMonths} men.` : "\u2014"}
          </span>
        </div>

        {/* Row C: Optional note – clamped to 1 line, no extra space if missing */}
        {offer.notes && (
          <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
            {offer.notes}
          </p>
        )}
      </div>

      {/* ── PART 3: Footer (pinned to bottom) ── */}
      <div className="mt-auto px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <span
          className={cn(
            "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0F3D2E] px-5 text-sm font-semibold text-[#FFFFFF] transition-colors",
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
