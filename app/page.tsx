import { getOffers, getLastUpdated } from "@/lib/offers"
import { TopNav } from "@/components/top-nav"
import { OffersGrid } from "@/components/offers-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Calendar } from "lucide-react"

export default function Home() {
  const offers = getOffers()
  const lastUpdated = getLastUpdated(offers)

  return (
    <>
      <TopNav />

      <main className="mx-auto min-h-screen max-w-[1100px] px-5 pb-16 md:px-8">
        {/* Hero */}
        <header className="pb-10 pt-16 text-center md:pb-14 md:pt-24">
          <h1 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl">
            {"Pigiausi elektros planai \u2013 vienoje vietoje"}
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {"Greitai palygink kain\u0105 ir m\u0117nesin\u012F mokest\u012F. Paspausk ir u\u017Eisakyk pas tiek\u0117j\u0105."}
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>{"Atnaujinta: "}{lastUpdated}</span>
          </div>
        </header>

        {/* Offers */}
        <section id="pasiulymai" className="scroll-mt-20">
          <OffersGrid offers={offers} />
        </section>

        {/* How it works */}
        <div className="mt-16 md:mt-20">
          <HowItWorks />
        </div>

        {/* Footer */}
        <footer id="kontaktai" className="mt-16 scroll-mt-20 border-t border-border pb-8 pt-8 text-center md:mt-20">
          <p className="text-sm text-muted-foreground">
            {"Kontaktai: hello@elektrosplanai.lt"}
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            {"Paspaudus nuorodą galime gauti komisinį atlygį. Kaina jums nesikeičia."}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/50">
            {"elektrosplanai.lt"}
          </p>
        </footer>
      </main>
    </>
  )
}
