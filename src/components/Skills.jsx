import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import EyebrowText from './EyebrowText'

export default function Skills({ skills }){
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })
  
  const buckets = [
        { title: 'Languages', items: skills.languages, color: 'lime-100' },
        { title: 'Frameworks & Tools', items: skills.frameworks, color: 'lime-100' },
        { title: 'Databases', items: skills.dbs, color: 'lime-100' },
        { title: 'DevOps & Cloud', items: skills.devops, color: 'lime-100' },
  ]
  
  return (
    <section id="skills" className="space-y-6" ref={ref}>
      <div className="mb-8">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4 text-lime-100">
          Technical Skills
        </EyebrowText>
        <motion.h2 
          initial={{opacity:0, y:20}}
          animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:20}}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona text-lime-100"
        >
          Skills
        </motion.h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {buckets.map((b, i) => (
          <motion.div 
            key={i} 
            className="card-lando gradient-border bg-white/5 border-white/10"
            initial={{opacity:0, y:50, scale:0.85, rotateX: 20}}
            animate={isVisible ? {opacity:1, y:0, scale:1, rotateX: 0} : {opacity:0, y:50, scale:0.85, rotateX: 20}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.65, 0.05, 0, 1] }}
            whileHover={{ scale: 1.08, y: -10, rotateX: -5, z: 50 }}
          >
            <div className="text-sm text-white/60 mb-4 font-semibold">{b.title}</div>
            <div className="flex flex-col gap-2">
              {b.items.map((it, idx) => (
                <motion.div 
                  key={idx} 
                  className="px-3 py-2 rounded-md border border-white/20 hover:border-lime-100/50 text-white/80 hover:text-lime-100 transition-all bg-white/5 hover:bg-white/10 cursor-default"
                  initial={{opacity:0, x:-10}}
                  animate={isVisible ? {opacity:1, x:0} : {opacity:0, x:-10}}
                  transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) + (idx * 0.05) }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  {it}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
