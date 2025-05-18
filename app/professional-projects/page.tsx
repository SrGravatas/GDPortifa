"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import ProjectModal from "@/components/project-modal"
import { projectsData } from "@/lib/projects-data"

export default function ProfessionalProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Memoize projects data to prevent unnecessary re-renders
  const projects = useMemo(() => projectsData.professional, [])

  const openProject = useCallback((project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  return (
    <div className="container py-8 md:py-12 max-w-screen-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">Professional Projects</h1>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-3xl">
        A collection of games and interactive experiences I've worked on professionally throughout my career.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openProject(project)}
          >
            <div className="aspect-video relative">
              <img
                src={project.thumbnail || "/placeholder.svg?height=300&width=500"}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=500"
                }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.shortDescription}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
