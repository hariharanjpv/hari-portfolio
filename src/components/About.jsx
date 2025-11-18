import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'

export default function About({ person }){
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section id="about" className="space-y-6" ref={ref}>
      <div className="mb-8">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4">
          About Me
        </EyebrowText>
        <motion.h2 
          initial={{opacity:0, y:20}} 
          animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:20}}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona"
        >
          <TextReveal delay={0.2} direction="right">About</TextReveal>
        </motion.h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          className="card-lando md:col-span-1 gradient-border"
          initial={{opacity:0, x:-50, rotateY: -10}}
          animate={isVisible ? {opacity:1, x:0, rotateY: 0} : {opacity:0, x:-50, rotateY: -10}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0.05, 0, 1] }}
          whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
        >
          <div className="text-sm small-muted mb-2">Quick Info</div>
          <div className="mt-3 font-semibold text-lg">{person.name} — Backend Engineer</div>
          <div className="mt-3 small-muted leading-relaxed">{person.summary}</div>
        </motion.div>
        <motion.div 
          className="card-lando md:col-span-2 gradient-border"
          initial={{opacity:0, x:50, rotateY: 10}}
          animate={isVisible ? {opacity:1, x:0, rotateY: 0} : {opacity:0, x:50, rotateY: 10}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0.05, 0, 1] }}
          whileHover={{ scale: 1.05, rotateY: -5, z: 50 }}
        >
          <div className="text-sm small-muted mb-2">Professional Summary</div>
          <div className="mt-3 leading-relaxed">{person.summary}</div>
          <div className="mt-6 flex gap-4 flex-wrap">
            {Object.entries(person.skills).map(([k, v], idx) => (
              <motion.div 
                key={k} 
                className="p-4 rounded-md border border-black/10 hover:border-lime-100/50 transition-all bg-white/40 hover:bg-white/60"
                initial={{opacity:0, scale:0.8}}
                animate={isVisible ? {opacity:1, scale:1} : {opacity:0, scale:0.8}}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-xs small-muted capitalize mb-1">{k}</div>
                <div className="mt-1 text-sm font-medium">{Array.isArray(v) ? v.join(' · ') : v}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
