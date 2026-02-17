"use client"

import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Palyginimas", href: "#pasiulymai" },
  { label: "Kaip tai veikia?", href: "#kaip-veikia" },
  { label: "Kontaktai", href: "#kontaktai" },
]

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">{"elektrosplanai.lt"}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-[#0F3D2E] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#0F3D2E] after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
          aria-label={open ? "Uzdaryti meniu" : "Atidaryti meniu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-all duration-200 md:hidden",
          open ? "max-h-60" : "max-h-0 border-t-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
