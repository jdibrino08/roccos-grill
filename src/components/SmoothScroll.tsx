import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={true}
      options={{
        lerp: 0.09,
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  )
}
