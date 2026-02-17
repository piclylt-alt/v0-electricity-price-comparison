import { getOffers, getLastUpdated } from "@/lib/offers"
import { OffersGrid } from "@/components/offers-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Leaf } from "lucide-react"

export default function Home() {
  const offers = getOffers()
  const lastUpdated = getLastUpdated(offers)

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 md:px-8 md:py-14">
      {/* Hero header */}
      <header className="mb-10 rounded-3xl border-2 border-border bg-secondary px-6 py-10 text-center md:px-12 md:py-14">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-accent">
          <Leaf className="size-6 text-accent-foreground" />
        </div>

        <h1 className="text-balance text-2xl font-bold leading-tight text-foreground md:text-4xl">
          {"Rask pigiausią elektros planą Lietuvoje"}
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-muted-foreground md:text-lg">
          {"Palygink tiekėjų kainas ir pasirink tau tinkamiausią planą."}
        </p>

        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {"Kainos atnaujinamos reguliariai. Paspausk pasiūlymą ir būsi nukreiptas į tiekėjo svetainę."}
        </p>

        <p className="mt-4 text-xs text-muted-foreground/70">
          {"Atnaujinta: "}{lastUpdated}
        </p>
      </header>

      {/* Offers */}
      <OffersGrid offers={offers} />

      {/* How it works */}
      <HowItWorks />

      {/* Disclaimer */}
      <footer className="mt-10 border-t-2 border-border pb-10 pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {"Informacija pateikiama informaciniais tikslais. Prieš pasirašydami sutartį pasitikrinkite sąlygas tiekėjo puslapyje."}
        </p>
        <p className="mt-4 text-xs text-muted-foreground/50">
          {"elektrosplanai.lt"}
        </p>
      </footer>
    </main>
  )
}
