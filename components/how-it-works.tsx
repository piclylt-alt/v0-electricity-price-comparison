import { Search, LayoutList, ExternalLink } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Surenkame kainas",
    text: "Surinkome pasiulymus is pagrindiniu Lietuvos elektros tiekeju.",
  },
  {
    icon: LayoutList,
    title: "Sulyginame",
    text: "Rodome visas kainas vienoje vietoje, surikiuotas nuo pigiausios.",
  },
  {
    icon: ExternalLink,
    title: "Nukreipiame",
    text: "Paspaudus mygtuka busi nukreiptas tiesiai i tiekejo puslapi.",
  },
]

export function HowItWorks() {
  return (
    <section id="kaip-veikia" className="scroll-mt-20">
      <h2 className="mb-8 text-center text-lg font-semibold text-foreground md:text-xl">
        {"Kaip tai veikia?"}
      </h2>

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary text-foreground">
              <step.icon className="size-5" />
            </div>
            <h3 className="mb-1.5 text-sm font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
