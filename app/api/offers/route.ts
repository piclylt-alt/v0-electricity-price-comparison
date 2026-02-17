import { getOffers, sortOffersByEffectivePrice } from "@/lib/offers"
import { NextResponse } from "next/server"

export async function GET() {
  const offers = sortOffersByEffectivePrice(getOffers())
  return NextResponse.json(offers)
}
