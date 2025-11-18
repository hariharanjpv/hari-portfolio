import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function LineReveal({ 
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
      setTimeout(() => setIsVisible(true), delay)
    }
  }, [isInView, delay])

  const transformOrigin = direction === 'right' ? 'left center' : 'right center'

  // Split text into lines
  const lines = typeof children === 'string' ? children.split('\n') : [children]

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <span 
          key={index}
          className="inline-block relative"
          style={{ position: 'relative', display: 'block' }}
        >
          <span className="relative z-10">{line}</span>
          <motion.div
            className={`absolute inset-0 ${
              color === 'lime' ? 'bg-lime-100' : 
              color === 'dark-green' ? 'bg-dark-green' : 
              'bg-lime-100'
            }`}
            style={{
              transformOrigin,
              zIndex: 5
            }}
            initial={{ scaleX: 1, scaleY: 1 }}
            animate={isVisible ? { 
              scaleX: 0,
              transition: {
                duration: 0.75,
                ease: [0.65, 0.05, 0, 1],
                delay: delay + (index * 0.1)
              }
            } : { scaleX: 1 }}
          />
        </span>
      ))}
    </div>
  )
}

