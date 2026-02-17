"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

type Theme = "day" | "night"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "day"
  const stored = localStorage.getItem("theme") as Theme | null
  if (stored === "day" || stored === "night") return stored
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "night"
  return "day"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = getInitialTheme()
    setTheme(initial)
    document.documentElement.setAttribute("data-theme", initial)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "day" ? "night" : "day"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
  }

  if (!mounted) {
    return <div className="size-10" />
  }

  return (
    <button
      onClick={toggle}
      className="flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={theme === "day" ? "Ijungti nakties rezima" : "Ijungti dienos rezima"}
    >
      {theme === "day" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  )
}
