import { Search, LayoutList, ExternalLink } from "lucide-react"

const steps = [
  {
    icon: Search,
    text: "Surenkame kainas is pagrindiniu Lietuvos elektros tiekeju.",
  },
  {
    icon: LayoutList,
    text: "Rodome visas kainas vienoje vietoje, surikiuotas nuo pigiausios.",
  },
  {
    icon: ExternalLink,
    text: "Paspaudus nuoroda busi nukreiptas tiesiai i tiekejo puslapi.",
  },
]

export function HowItWorks() {
  return (
    <section id="kaip-veikia" className="scroll-mt-20">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{"Kaip tai veikia?"}</h3>
      <ul className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <step.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm leading-relaxed text-muted-foreground">{step.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
