export type PlanType = "fixed" | "variable"

export type TermMonths = 12 | 24 | 36 | null

export interface Offer {
  id: string
  supplierName: string
  planName: string
  planType: PlanType
  termMonths: TermMonths
  priceEurKwh: number
  monthlyFeeEur: number
  notes: string
  lastUpdatedISO: string
  redirectUrl: string
}
