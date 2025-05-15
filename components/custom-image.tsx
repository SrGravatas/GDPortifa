"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface CustomImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function CustomImage({ src, alt, fallbackSrc = "/placeholder.svg", ...props }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc)
      setError(true)
    }
  }

  return <Image {...props} src={imgSrc || "/placeholder.svg"} alt={alt} onError={handleError} unoptimized />
}
