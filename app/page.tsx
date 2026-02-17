import { getOffers, getLastUpdated } from "@/lib/offers"
import { TopNav } from "@/components/top-nav"
import { OffersGrid } from "@/components/offers-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Calendar, ShieldCheck, Zap } from "lucide-react"

export default function Home() {
  const offers = getOffers()
  const lastUpdated = getLastUpdated(offers)

  return (
    <>
      <TopNav />

      <main className="mx-auto min-h-screen max-w-5xl px-5 pb-10 pt-8 md:px-8 md:pt-12">
        {/* Hero */}
        <header className="mb-10 rounded-3xl bg-secondary px-6 py-10 text-center md:px-12 md:py-14">
          <h1 className="text-balance text-2xl font-bold leading-tight text-foreground md:text-4xl">
            {"Rask pigiausia elektros plana Lietuvoje"}
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {"Palygink tiekeju kainas ir pasirink tau tinkamiausia plana."}
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            {"Paspaudus pasiulyma busi nukreiptas i tiekejo svetaine."}
          </p>

          {/* Trust microcopy */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {"Atnaujinta: "}{lastUpdated}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4" />
              {"Be registracijos"}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="size-4" />
              {"Nemokamai"}
            </span>
          </div>
        </header>

        {/* Offers */}
        <section id="pasiulymai" className="scroll-mt-20">
          <OffersGrid offers={offers} />
        </section>

        {/* How it works */}
        <div className="mt-12">
          <HowItWorks />
        </div>

        {/* Footer */}
        <footer id="kontaktai" className="mt-12 scroll-mt-20 border-t border-[#B86A3A]/20 pb-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {"Kontaktai: hello@elektrosplanai.lt"}
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            {"Paspaudus nuoroda galime gauti komisini atlygi. Kaina jums nesikeiia."}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/50">
            {"elektrosplanai.lt"}
          </p>
        </footer>
      </main>
    </>
  )
}
