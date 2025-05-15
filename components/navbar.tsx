import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { MobileNav } from "./mobile-nav"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl mx-auto px-4">
        <Link href="/" className="font-bold text-xl">
          Andre Vargas
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/professional-projects" className="transition-colors hover:text-foreground/80">
            Professional Projects
          </Link>
          <Link href="/personal-projects" className="transition-colors hover:text-foreground/80">
            Personal Projects
          </Link>
          <Link href="/resume" className="transition-colors hover:text-foreground/80">
            Resume
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild className="hidden md:flex" size="sm">
            <Link href="/contact">Contact Me</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
