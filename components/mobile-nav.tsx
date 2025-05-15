"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Linkedin, Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/professional-projects",
      label: "Professional Projects",
    },
    {
      href: "/personal-projects",
      label: "Personal Projects",
    },
    {
      href: "/resume",
      label: "Resume",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-lg px-2 py-3 rounded-md hover:bg-accent ${
                pathname === route.href ? "font-medium bg-accent" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <div className="h-px bg-border my-4" />
          <div className="flex justify-center mt-2">
            <Link
              href="https://www.linkedin.com/in/andrefvargas/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20"
              onClick={() => setOpen(false)}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
