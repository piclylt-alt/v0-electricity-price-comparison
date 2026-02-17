import offersData from "@/data/offers.lt.json"
import type { Offer } from "@/types/offer"

export function getOffers(): Offer[] {
  return offersData as Offer[]
}

export function getEffectivePrice(offer: Offer): number {
  return offer.priceEurKwh + offer.monthlyFeeEur / 100
}

export function sortOffersByEffectivePrice(offers: Offer[]): Offer[] {
  return [...offers].sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
}

export function getLastUpdated(offers: Offer[]): string {
  const dates = offers.map((o) => new Date(o.lastUpdatedISO).getTime())
  const newest = new Date(Math.max(...dates))
  return newest.toISOString().split("T")[0]
}

export function onCardClick(offerId: string, supplierName: string) {
  console.log(`[analytics] Card clicked: ${supplierName} (${offerId})`)
}

export function formatPriceKwh(price: number): string {
  return `\u20AC${price.toFixed(3)}`
}

export function formatMoneyEur(amount: number): string {
  return `${amount.toFixed(2)} \u20AC`
}
