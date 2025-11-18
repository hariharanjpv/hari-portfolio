import { useEffect, useRef, useState } from 'react'

export function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const elementTop = rect.top + scrolled
        const elementCenter = elementTop + rect.height / 2
        const windowCenter = window.innerHeight / 2
        const distance = scrolled + windowCenter - elementCenter
        setOffset(distance * speed)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}

