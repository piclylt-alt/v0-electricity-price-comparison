import { Search, LayoutList, ExternalLink, ShieldCheck } from "lucide-react"

const steps = [
  {
    icon: Search,
    text: "Surinkome kainas is tiekeju pasiulymu",
  },
  {
    icon: LayoutList,
    text: "Sulyginome jas vienoje vietoje",
  },
  {
    icon: ExternalLink,
    text: "Paspaudus busite nukreipti pas tiekeja",
  },
]

export function HowItWorks() {
  return (
    <section id="kaip-veikia" className="scroll-mt-20 rounded-3xl bg-secondary px-6 py-10 md:px-10 md:py-12">
      <h2 className="mb-8 text-center text-xl font-bold text-foreground md:text-2xl">
        {"Kaip tai veikia?"}
      </h2>

      <div className="mx-auto flex max-w-xl flex-col gap-5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <step.icon className="size-5" />
            </div>
            <p className="text-base leading-relaxed text-foreground">{step.text}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-[#B86A3A]/20 bg-card px-5 py-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          {"Informacija pateikiama informaciniais tikslais. Pries sudarydami sutarti pasitikrinkite salygas tiekejo puslapyje."}
        </p>
      </div>
    </section>
  )
}
