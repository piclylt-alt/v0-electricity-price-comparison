import { Search, LayoutList, ExternalLink } from "lucide-react"

const steps = [
  {
    icon: Search,
    text: "Surenkame tiekėjų kainas.",
  },
  {
    icon: LayoutList,
    text: "Parodome jas paprastai vienoje vietoje.",
  },
  {
    icon: ExternalLink,
    text: "Paspaudę pasiūlymą būsite nukreipti į tiekėjo svetainę.",
  },
]

export function HowItWorks() {
  return (
    <section className="mt-12 rounded-3xl border-2 border-border bg-secondary px-6 py-10 md:px-12">
      <h2 className="mb-8 text-center text-xl font-bold text-foreground md:text-2xl">
        {"Kaip tai veikia?"}
      </h2>

      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <step.icon className="size-5" />
            </div>
            <p className="pt-2 text-base text-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
