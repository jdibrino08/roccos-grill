import React from 'react'

interface GlassTextProps {
  children: React.ReactNode
  variant?: 'crystal' | 'red'
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'div'
  shimmer?: boolean
}

export function GlassText({
  children,
  variant = 'crystal',
  className = '',
  as: Component = 'span',
  shimmer = true,
}: GlassTextProps) {
  const baseClass = variant === 'red' ? 'glass-text-red' : 'glass-text'

  return (
    <Component className={`relative inline-block ${className}`}>
      {/* Layer 1: Optical Translucent Crystal Body + Crisp Beveled Rim */}
      <span className={`relative z-10 block ${baseClass}`}>
        {children}
      </span>

      {/* Layer 2: Moving Specular Light Reflection Sweep */}
      {shimmer && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 z-20 block glass-sheen-layer"
        >
          {children}
        </span>
      )}
    </Component>
  )
}
