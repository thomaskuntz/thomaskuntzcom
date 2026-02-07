import { useState, useEffect, useRef } from 'react'

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafId = useRef(null)

  useEffect(() => {
    function update() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollHeight)))
    }

    function onScroll() {
      if (rafId.current !== null) return
      rafId.current = requestAnimationFrame(() => {
        update()
        rafId.current = null
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return progress
}
