import { useEffect, useRef } from 'react'
import { useAccessibilityStore } from '../../../features/dyslexia/store/useAccessibilityStore'

/**
 * A translucent horizontal bar that follows the cursor vertically,
 * helping users with dyslexia track their reading position.
 * Renders as a fixed overlay — must be mounted once at the root layout.
 */
export function ReadingGuide() {
  const { readingGuide } = useAccessibilityStore()
  const guideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!readingGuide) return

    const handleMouseMove = (e: MouseEvent) => {
      if (guideRef.current) {
        guideRef.current.style.top = `${e.clientY - 12}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [readingGuide])

  if (!readingGuide) return null

  return (
    <div
      ref={guideRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 h-6 z-[9999] transition-none"
      style={{
        background:
          'linear-gradient(to bottom, transparent, rgba(170,59,255,0.12) 40%, rgba(170,59,255,0.12) 60%, transparent)',
        top: 0,
      }}
    />
  )
}
