import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({ 
  children, 
  direction = 'right', 
  delay = 0,
  color = 'lime',
  className = ''
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  const transformOrigin = direction === 'right' ? 'right center' : 'left center'

  return (
    <span 
      ref={ref}
      className={`inline-block relative ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span className="relative z-10" style={{ position: 'relative', zIndex: 10 }}>{children}</span>
      <motion.div
        className={`absolute inset-0 ${
          color === 'lime' ? 'bg-lime-100' : 
          color === 'dark-green' ? 'bg-dark-green' : 
          'bg-lime-100'
        }`}
        style={{
          transformOrigin,
          zIndex: 5,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        initial={{ scaleX: 1 }}
        animate={isVisible ? { 
          scaleX: 0,
          transition: {
            duration: 0.75,
            ease: [0.65, 0.05, 0, 1]
          }
        } : { scaleX: 1 }}
      />
    </span>
  )
}

