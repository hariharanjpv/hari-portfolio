import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EyebrowText({ 
  children, 
  direction = 'right',
  color = 'lime',
  delay = 0,
  className = ''
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  const transformOrigin = direction === 'right' ? 'right center' : 'left center'
  const bgColor = color === 'lime' ? 'var(--color--lime)' : 
                 color === 'dark-green-tint-1' ? 'var(--color--dark-green-tint-1)' :
                 'var(--color--lime-off)'

  return (
    <div ref={ref} className={`text-eyebrow ${className}`}>
      <span className="line relative inline-block">
        {children}
        <motion.div
          className="high-line-reveal"
          style={{
            backgroundColor: bgColor,
            transformOrigin
          }}
          initial={{ scaleX: 1 }}
          animate={isVisible ? { 
            scaleX: 0,
            transition: {
              duration: 0.75,
              ease: [0.65, 0.05, 0, 1],
              delay: delay
            }
          } : { scaleX: 1 }}
        />
      </span>
    </div>
  )
}

