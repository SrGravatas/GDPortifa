"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ProjectModal from "@/components/project-modal"
import { projectsData } from "@/lib/projects-data"

export default function PersonalProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className="container py-8 md:py-12 max-w-screen-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">Personal Projects</h1>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-3xl">
        Passion projects and experimental games I've created in my spare time to explore new ideas and technologies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projectsData.personal.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openProject(project)}
          >
            <div className="aspect-video relative">
              <Image
                src={project.thumbnail || "/placeholder.svg?height=300&width=500"}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
                priority
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
