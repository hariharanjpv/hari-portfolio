import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-lime-100/20 z-50 origin-left"
      style={{ scaleX }}
    >
      <motion.div
        className="h-full bg-lime-100"
        style={{ scaleX }}
      />
    </motion.div>
  )
}

