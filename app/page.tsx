"use client"

import { useState } from "react"
import { getOffers, getLastUpdated } from "@/lib/offers"
import { SidebarPanel } from "@/components/sidebar-panel"
import { OffersGrid } from "@/components/offers-grid"
import { HowItWorks } from "@/components/how-it-works"
import type { PlanType, TermMonths } from "@/types/offer"

const offers = getOffers()
const lastUpdated = getLastUpdated(offers)

export default function Home() {
  const [planType, setPlanType] = useState<PlanType | "all">("all")
  const [term, setTerm] = useState<TermMonths | "all">("all")

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-6 lg:px-8 lg:py-8">
      {/* Two-panel layout: sidebar + offers */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left panel */}
        <SidebarPanel
          planType={planType}
          setPlanType={(type) => {
            setPlanType(type)
            if (type === "variable") setTerm("all")
          }}
          term={term}
          setTerm={setTerm}
          lastUpdated={lastUpdated}
        />

        {/* Right panel */}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <section id="pasiulymai" className="scroll-mt-8">
            <OffersGrid offers={offers} planType={planType} term={term} />
          </section>

          {/* How it works + footer below grid */}
          <div className="rounded-[10px] border border-border bg-card px-5 py-6">
            <HowItWorks />

            <footer id="kontaktai" className="mt-6 scroll-mt-20 border-t border-border pt-5">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {"Paspaudus nuoroda galime gauti komisini atlygi. Kaina jums nesikeis."}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {"Kontaktai: hello@elektrosplanai.lt"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/60">
                {"Informacija nera finansine konsultacija. Patikrinkite salygus tiekejo puslapyje."}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
