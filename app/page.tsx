import { getOffers, getLastUpdated } from "@/lib/offers"
import { OffersList } from "@/components/offers-list"
import { CalendarDays, Zap } from "lucide-react"

export default function Home() {
  const offers = getOffers()
  const lastUpdated = getLastUpdated(offers)

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-8 md:py-12">
      {/* Header */}
      <header className="flex flex-col gap-4 pb-8">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">{"palygink.lt"}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {"Elektros kainų palyginimas"}
          </h1>
          <p className="text-pretty text-sm text-muted-foreground md:text-base">
            {"Greitai palygink tiekėjų planus ir pasirink pigiausią."}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          <span>{"Atnaujinta: "}{lastUpdated}</span>
        </div>
      </header>

      {/* Offers */}
      <OffersList offers={offers} />

      {/* Affiliate disclosure */}
      <div className="mt-8 rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground">
        <p className="font-medium">
          {"Paspaudus galime gauti komisinį atlygį. Kaina jums nesikeičia."}
        </p>
      </div>

      {/* Disclaimer */}
      <footer className="mt-6 flex flex-col gap-1 border-t border-border pb-8 pt-6 text-xs text-muted-foreground">
        <p>{"Informacija pateikiama informaciniais tikslais."}</p>
        <p>{"Prieš sudarant sutartį pasitikrinkite sąlygas pas tiekėją."}</p>
        <p className="mt-2 text-muted-foreground/50">
          {"SAMPLE DATA – kainos yra demonstracinės ir neatspindi realių tiekėjų pasiūlymų."}
        </p>
      </footer>
    </main>
  )
}
