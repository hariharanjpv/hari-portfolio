import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ImpactText({ 
  children, 
  variant = 'lg-mona', // 'lg-mona', 'reg-brier', 'reg-mona'
  direction = 'right',
  color = 'lime-off',
  delay = 0,
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
  const bgColor = color === 'lime' ? 'var(--color--lime)' : 
                 color === 'dark-green-tint-1' ? 'var(--color--dark-green-tint-1)' :
                 'var(--color--lime-off)'

  const variantClass = variant === 'lg-mona' ? 'text-impact-lg-mona' :
                       variant === 'reg-brier' ? 'text-impact-reg-brier' :
                       'text-impact-reg-mona'

  // Split text into lines
  let lines = []
  if (typeof children === 'string') {
    lines = children.split('\n').map(line => ({ type: 'string', content: line }))
  } else {
    // For JSX children, wrap in array
    lines = [{ type: 'jsx', content: children }]
  }

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="line relative inline-block block">
          {line.type === 'string' ? line.content : line.content}
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
                delay: delay + (index * 0.1)
              }
            } : { scaleX: 1 }}
          />
        </span>
      ))}
    </div>
  )
}

