"use client"

import type { Offer } from "@/types/offer"
import { onCardClick } from "@/lib/offers"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ExternalLink, Zap } from "lucide-react"

interface OfferCardProps {
  offer: Offer
  rank: number
  isCheapest?: boolean
}

export function OfferCard({ offer, rank, isCheapest = false }: OfferCardProps) {
  const handleClick = () => {
    onCardClick(offer.id, offer.supplierName)
    window.open(offer.redirectUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative flex w-full flex-col rounded-xl border bg-card p-5 text-left text-card-foreground shadow-sm transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isCheapest
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-border hover:border-primary/20"
      )}
      aria-label={`${offer.supplierName} \u2013 ${offer.planName}: \u20AC${offer.priceEurKwh.toFixed(3)}/kWh. Peržiūrėti pasiūlymą.`}
    >
      {/* Rank badge */}
      {isCheapest ? (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
          <Zap className="size-3" />
          <span>{"#1 PIGIAUSIA"}</span>
        </div>
      ) : (
        <div className="absolute -top-2.5 left-4 flex size-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
          {rank}
        </div>
      )}

      {/* Top row: supplier + price */}
      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm font-bold text-foreground">{offer.supplierName}</span>
          <span className="truncate text-xs text-muted-foreground">{offer.planName}</span>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {"\u20AC"}{offer.priceEurKwh.toFixed(3)}
          </span>
          <span className="text-xs text-muted-foreground">{"/kWh"}</span>
        </div>
      </div>

      {/* Middle: badges and details */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge
          variant={offer.planType === "fixed" ? "default" : "secondary"}
          className={cn(
            "text-[10px] uppercase tracking-wider",
            offer.planType === "fixed"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {offer.planType === "fixed" ? "Fiksuota" : "Kintama"}
        </Badge>
        {offer.termMonths && (
          <span className="text-xs text-muted-foreground">
            {offer.termMonths}{" mėn."}
          </span>
        )}
        {offer.monthlyFeeEur > 0 && (
          <span className="text-xs text-muted-foreground">
            {offer.monthlyFeeEur.toFixed(2)}{" \u20AC/mėn."}
          </span>
        )}
      </div>

      {/* Notes */}
      {offer.notes && (
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground/70">
          {offer.notes}
        </p>
      )}

      {/* CTA button */}
      <div className="mt-auto pt-4">
        <Button
          variant="default"
          size="sm"
          className="pointer-events-none w-full gap-1.5"
          tabIndex={-1}
          asChild
        >
          <span>
            {"Peržiūrėti pasiūlymą"}
            <ExternalLink className="size-3.5" />
          </span>
        </Button>
      </div>
    </button>
  )
}
