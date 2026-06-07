"use client"

import React, { ElementType, ReactNode, useEffect, useState } from "react"

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ")
}

export interface VideoTextProps {
  src: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
  children: ReactNode
  fontSize?: string | number
  fontWeight?: string | number
  textAnchor?: string
  dominantBaseline?: string
  fontFamily?: string
  as?: ElementType
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "span",
}: VideoTextProps) {
  const content = React.Children.toArray(children).join("")
  const isVideo = /\.(mp4|webm|mov)$/i.test(src)

  // For static images we use a background-image + background-clip:text
  // This reliably fills the glyphs with the image. For video sources
  // we continue to render an absolutely positioned <video> behind
  // a transparent text layer.
  const commonStyle: React.CSSProperties = {
    display: "inline-block",
    fontSize: "inherit",
    lineHeight: "inherit",
  }

  if (!isVideo) {
    const bgStyle: React.CSSProperties = {
      ...commonStyle,
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "transparent",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    }

    return (
      <Component className={cn("inline-block", className)} style={bgStyle}>
        {content}
      </Component>
    )
  }

  return (
    <Component
      className={cn("relative inline-block overflow-hidden text-transparent", className)}
      style={commonStyle}
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {content}
      </span>
    </Component>
  )
}
