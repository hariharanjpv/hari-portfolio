import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'

export default function Experience({ items }){
  const [open, setOpen] = useState(0)
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section id="experience" className="space-y-6" ref={ref}>
      <div className="mb-8">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4">
          Career
        </EyebrowText>
        <motion.h2 
          initial={{opacity:0, y:20}}
          animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:20}}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona"
        >
          <TextReveal delay={0.2} direction="right">Experience</TextReveal>
        </motion.h2>
      </div>
      <div className="space-y-4 relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-100/30 via-lime-100/20 to-transparent hidden md:block" />
        
        {items.map((it, idx) => (
          <motion.div 
            key={idx} 
            className="card-lando gradient-border relative md:pl-12"
            // Use opacity-only entrance to avoid layout thrash / stutter
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.75, delay: idx * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            // Keep a small hover translate for interactivity but avoid large transforms
            whileHover={{ x: 6, rotateZ: 0.5 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-lime-100 border-4 border-beige hidden md:block shadow-lg" />
            
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="text-sm small-muted mb-1">{it.company} • {it.location}</div>
                <div className="font-semibold text-xl mb-1">
                  <TextReveal delay={0.1 + idx * 0.1} direction="right">{it.role}</TextReveal>
                </div>
                <div className="small-muted text-sm mb-2">{it.product} · {it.period}</div>
              </div>
              <motion.button 
                onClick={()=> setOpen(open === idx ? -1 : idx)} 
                className="px-4 py-2 border border-lime-100/30 rounded-md small-muted hover:bg-lime-100/10 hover:border-lime-100 hover:text-lime-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {open === idx ? 'Collapse' : 'Expand'}
              </motion.button>
            </div>
            <AnimatePresence>
              {open === idx && (
                <motion.ul 
                  className="mt-4 list-disc ml-5 space-y-2 small-muted"
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  exit={{opacity:0}}
                  transition={{duration:0.3}}
                >
                  {it.bullets.map((b, i) => (
                    <motion.li 
                      key={i}
                      initial={{opacity:0, x:-10}}
                      animate={{opacity:1, x:0}}
                      transition={{delay: i * 0.1}}
                      className="leading-relaxed"
                    >
                      {b}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
