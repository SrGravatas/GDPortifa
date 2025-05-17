"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, X, Maximize, Youtube, ExternalLink } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import MediaViewer from "./media-viewer"
import CustomImage from "./custom-image"

export default function ProjectModal({ project, isOpen, onClose }) {
  const [isMobile, setIsMobile] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")
  const [activeTab, setActiveTab] = useState("info")
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false)
  const [mediaViewerIndex, setMediaViewerIndex] = useState(0)
  const [viewerMedia, setViewerMedia] = useState([])
  const [allMedia, setAllMedia] = useState([])

  useEffect(() => {
    setIsMobile(isSmallScreen)
  }, [isSmallScreen])

  // Reset state when project changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentMediaIndex(0)
    }
  }, [project, isOpen])

  // Update allMedia and viewerMedia when project changes
  useEffect(() => {
    if (!project || !project.media) {
      setAllMedia([])
      setViewerMedia([])
      return
    }

    const videos = project.media?.videos || []
    const images = project.media?.images || []
    const youtubeVideos = project.media?.youtubeVideos || []

    // Transformar vídeos do YouTube em um formato compatível com o restante da mídia
    const formattedYoutubeVideos = youtubeVideos.map((video) => ({
      ...video,
      type: "youtube",
      youtubeUrl: video.url,
      // Usamos uma URL temporária para o thumbnail que será substituída pelo thumbnail real do YouTube
      url: `/placeholder.svg?height=300&width=500`,
    }))

    // Combinar todos os tipos de mídia em uma única lista
    const mediaArray = [...videos, ...formattedYoutubeVideos, ...images]

    setAllMedia(mediaArray)

    // Prepare media array for the MediaViewer component
    const mediaForViewer = mediaArray
      .filter((media) => media.type !== "youtube") // Excluir vídeos do YouTube do visualizador de mídia
      .map((media) => ({
        url: media.url || "",
        title: media.title || "",
        type: media.url?.endsWith(".mp4") || media.url?.endsWith(".webm") ? "video" : "image",
      }))

    setViewerMedia(mediaForViewer)
  }, [project])

  // Função para extrair o ID do vídeo do YouTube a partir da URL
  const getYoutubeVideoId = useCallback((url) => {
    if (!url) return null

    // Padrão para URLs completas do YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    // Padrão para URLs de shorts do YouTube
    const shortsRegExp = /^.*(youtube.com\/shorts\/)([^#&?]*).*/
    const shortsMatch = url.match(shortsRegExp)

    return match && match[2].length === 11
      ? match[2]
      : shortsMatch && shortsMatch[2].length === 11
        ? shortsMatch[2]
        : null
  }, [])

  // Função para obter a URL completa do YouTube para abrir em uma nova aba
  const getYoutubeFullUrl = useCallback(
    (youtubeUrl) => {
      const videoId = getYoutubeVideoId(youtubeUrl)
      if (!videoId) return null
      return `https://www.youtube.com/watch?v=${videoId}`
    },
    [getYoutubeVideoId],
  )

  const renderMediaGallery = () => {
    if (!project) return null

    const hasMedia = allMedia.length > 0

    if (!hasMedia) {
      return (
        <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No media available</p>
          </div>
        </div>
      )
    }

    // Garantir que o índice atual está dentro dos limites do array
    const safeIndex = Math.min(Math.max(0, currentMediaIndex), allMedia.length - 1)
    const currentMedia = allMedia[safeIndex]

    if (!currentMedia) {
      return (
        <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Media not available</p>
          </div>
        </div>
      )
    }

    // Função para navegar para a próxima mídia
    const goToNext = () => {
      if (currentMediaIndex < allMedia.length - 1) {
        setCurrentMediaIndex(currentMediaIndex + 1)
      }
    }

    // Função para navegar para a mídia anterior
    const goToPrev = () => {
      if (currentMediaIndex > 0) {
        setCurrentMediaIndex(currentMediaIndex - 1)
      }
    }

    // Função para abrir o visualizador de mídia
    const openMediaViewer = (index) => {
      // Calcular o índice correto para o visualizador de mídia, excluindo vídeos do YouTube
      let viewerIndex = 0
      let localMediaCount = 0

      for (let i = 0; i < allMedia.length; i++) {
        if (allMedia[i].type !== "youtube") {
          if (i === index) {
            viewerIndex = localMediaCount
          }
          localMediaCount++
        }
      }

      setMediaViewerIndex(viewerIndex)
      setIsMediaViewerOpen(true)
    }

    return (
      <div className="space-y-4">
        {/* Main media display */}
        <div className="aspect-video relative bg-muted rounded-md overflow-hidden group h-[250px] md:h-[300px] max-h-[300px]">
          {currentMedia.type === "youtube" ? (
            // YouTube player
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                <iframe
                  key={`youtube-${currentMediaIndex}`}
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(currentMedia.youtubeUrl)}?enablejsapi=1&rel=0`}
                  title={currentMedia?.title || "YouTube Video"}
                  className="absolute inset-0 w-full h-full z-10"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>

                {/* Botão para abrir o vídeo em uma nova aba */}
                <a
                  href={getYoutubeFullUrl(currentMedia.youtubeUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 z-20 bg-background/80 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Open video in YouTube"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {currentMedia?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 z-20 pointer-events-none">
                  <p className="text-sm font-medium">{currentMedia.title}</p>
                </div>
              )}
            </div>
          ) : currentMedia.url?.endsWith(".mp4") || currentMedia.url?.endsWith(".webm") ? (
            // Video player
            <div className="absolute inset-0">
              <video
                key={`video-${currentMediaIndex}`}
                src={currentMedia?.url}
                controls
                className="w-full h-full object-contain"
                poster="/placeholder.svg?height=300&width=500"
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
              {currentMedia?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 z-10 pointer-events-none">
                  <p className="text-sm font-medium">{currentMedia.title}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/70"
                onClick={() => openMediaViewer(currentMediaIndex)}
              >
                <Maximize className="h-4 w-4" />
                <span className="sr-only">View fullscreen</span>
              </Button>
            </div>
          ) : (
            // Image display
            <div className="absolute inset-0">
              <div className="relative w-full h-full cursor-pointer" onClick={() => openMediaViewer(currentMediaIndex)}>
                <CustomImage
                  key={`image-${currentMediaIndex}`}
                  src={currentMedia?.url || "/placeholder.svg?height=300&width=500"}
                  alt={currentMedia?.title || "Project image"}
                  fill
                  className="object-contain p-2"
                  fallbackSrc="/placeholder.svg?height=300&width=500"
                />
              </div>
              {currentMedia?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 pointer-events-none">
                  <p className="text-sm font-medium">{currentMedia.title}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/70"
                onClick={() => openMediaViewer(currentMediaIndex)}
              >
                <Maximize className="h-4 w-4" />
                <span className="sr-only">View fullscreen</span>
              </Button>
            </div>
          )}
        </div>

        {/* Media navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={goToPrev} disabled={currentMediaIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm text-center">
            {currentMediaIndex + 1} of {allMedia.length}
          </div>

          <Button variant="outline" size="icon" onClick={goToNext} disabled={currentMediaIndex === allMedia.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Thumbnails - Centralizado */}
        <div className="flex justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x max-w-full">
            {allMedia.map((media, index) => (
              <button
                key={`thumb-${index}`}
                type="button"
                className={`flex-shrink-0 w-24 h-16 relative bg-muted rounded-md overflow-hidden cursor-pointer border-2 snap-center ${
                  currentMediaIndex === index ? "border-primary" : "border-transparent"
                } hover:opacity-90 transition-opacity`}
                onClick={() => {
                  console.log("Setting current media index to:", index)
                  setCurrentMediaIndex(index)
                }}
                aria-label={`View media ${index + 1}`}
                aria-current={currentMediaIndex === index ? "true" : "false"}
              >
                {media.type === "youtube" ? (
                  // YouTube thumbnail
                  <div className="relative w-full h-full">
                    <CustomImage
                      src={`https://img.youtube.com/vi/${getYoutubeVideoId(media.youtubeUrl)}/mqdefault.jpg`}
                      alt={media.title || "YouTube Thumbnail"}
                      fill
                      className="object-cover"
                      fallbackSrc="/placeholder.svg?height=64&width=96"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : media.url?.endsWith(".mp4") || media.url?.endsWith(".webm") ? (
                  // Video thumbnail
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-muted-foreground" />
                  </div>
                ) : (
                  // Image thumbnail
                  <div className="relative w-full h-full">
                    <CustomImage
                      src={media.url || "/placeholder.svg"}
                      alt={media.title || "Thumbnail"}
                      fill
                      className="object-cover"
                      fallbackSrc="/placeholder.svg?height=64&width=96"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderProjectInfo = () => {
    if (!project) return null

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {project.projectType && (
            <div className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              {project.projectType}
            </div>
          )}
          {project.company && (
            <div className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              {project.company}
            </div>
          )}
          {project.date && (
            <div className="inline-block px-2 py-1 bg-secondary/30 text-secondary-foreground rounded-md text-sm">
              {project.date}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold">About the Project</h4>
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{project.description}</p>
        </div>

        <div>
          <h4 className="font-semibold">My Contribution</h4>
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{project.contribution}</p>
        </div>

        {project.title === "Skydome" && project.levelDesign && (
          <div>
            <h4 className="font-semibold">Level Design in Skydome</h4>
            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{project.levelDesign}</p>
          </div>
        )}

        {project.title !== "Skydome" && project.learnings && (
          <div>
            <h4 className="font-semibold">What I Learned</h4>
            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{project.learnings}</p>
          </div>
        )}

        {project.generalContribution && (
          <div>
            <h4 className="font-semibold">General Contribution</h4>
            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{project.generalContribution}</p>
          </div>
        )}

        <div>
          <h4 className="font-semibold">Technologies Used</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mobile view
  if (isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="px-4 max-h-[90vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>{project?.title}</DrawerTitle>
              <DrawerDescription>{project?.role}</DrawerDescription>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
                onClick={() => onClose()}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerHeader>

            <div className="pb-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <Tabs defaultValue="media" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 bg-background">
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="info">Information</TabsTrigger>
                </TabsList>
                <TabsContent value="media" className="mt-4">
                  {renderMediaGallery()}
                </TabsContent>
                <TabsContent value="info" className="mt-4 overflow-y-auto max-h-[60vh]">
                  {renderProjectInfo()}
                </TabsContent>
              </Tabs>
            </div>
          </DrawerContent>
        </Drawer>

        {isMediaViewerOpen && (
          <MediaViewer
            isOpen={isMediaViewerOpen}
            onClose={() => setIsMediaViewerOpen(false)}
            media={viewerMedia}
            initialIndex={mediaViewerIndex}
          />
        )}
      </>
    )
  }

  // Desktop view
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{project?.title}</DialogTitle>
            <DialogDescription>{project?.role}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row mt-4 overflow-hidden">
            {/* Coluna da esquerda - Mídia */}
            <div className="flex flex-col md:w-[45%] max-h-[calc(90vh-150px)] pr-0 md:pr-4">
              <div className="bg-card rounded-md p-4 h-full overflow-hidden">{renderMediaGallery()}</div>
            </div>

            {/* Divisor vertical */}
            <div className="hidden md:block w-px bg-border h-[calc(90vh-150px)] mx-2"></div>

            {/* Coluna da direita - Informações */}
            <div className="md:w-[55%] overflow-y-auto pr-2 max-h-[calc(90vh-150px)] pl-0 md:pl-4 mt-4 md:mt-0">
              <div className="bg-card rounded-md p-4 h-full">{renderProjectInfo()}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isMediaViewerOpen && (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          onClose={() => setIsMediaViewerOpen(false)}
          media={viewerMedia}
          initialIndex={mediaViewerIndex}
        />
      )}
    </>
  )
}
