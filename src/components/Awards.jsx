import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'

export default function Awards({ items }){
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="space-y-6" ref={ref}>
      <div className="mb-8">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4">
          Recognition
        </EyebrowText>
        <motion.h2 
          initial={{opacity:0, y:20}}
          animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:20}}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona"
        >
          <TextReveal delay={0.2} direction="right">Awards & Achievements</TextReveal>
        </motion.h2>
      </div>
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
        {items.map((a, idx) => (
          <motion.div 
            key={idx} 
            className="min-w-[280px] card-lando gradient-border flex-shrink-0"
            initial={{opacity:0, scale:0.8, x:80, rotateY: 20}}
            animate={isVisible ? {opacity:1, scale:1, x:0, rotateY: 0} : {opacity:0, scale:0.8, x:80, rotateY: 20}}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.65, 0.05, 0, 1] }}
            whileHover={{ scale: 1.08, y: -10, rotateY: -5, z: 50 }}
          >
            <div className="flex items-start gap-3">
              <motion.div 
                className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-black font-bold flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                🏆
              </motion.div>
              <div>
                <div className="text-xs small-muted mb-1">Award</div>
                <div className="font-semibold leading-relaxed">
                  <TextReveal delay={0.1 + idx * 0.1} direction="right">{a}</TextReveal>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
