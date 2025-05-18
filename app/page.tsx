"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  // Este useEffect garante que o iframe só seja renderizado no lado do cliente
  // para evitar erros de hidratação com o Next.js
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {isClient && (
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/_R0oUPJownQ?autoplay=1&mute=1&controls=0&loop=1&playlist=_R0oUPJownQ&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute w-full h-full object-cover"
              style={{
                width: "100vw",
                height: "56.25vw" /* 16:9 Aspect Ratio */,
                minHeight: "100%",
                minWidth: "177.77vh" /* 16:9 Aspect Ratio */,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none", // Impede interações com o vídeo
              }}
              frameBorder="0"
            ></iframe>
          </div>
        )}
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">Andre Vargas</h1>
        <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
          I craft interactive experiences with purpose and passion — discover my work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center items-center">
          <Button asChild size="lg" className="bg-primary/90 hover:bg-primary">
            <Link href="/professional-projects">Professional Projects</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-background/20 backdrop-blur-sm hover:bg-background/30 border-white/20 text-white"
          >
            <Link href="/personal-projects">Personal Projects</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-secondary/90 hover:bg-secondary">
            <Link href="/resume">Resume</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
