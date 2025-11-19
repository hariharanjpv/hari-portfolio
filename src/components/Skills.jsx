import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import EyebrowText from './EyebrowText'
import languagesBg from '../assets/skills/languages.png'
import frameworksBg from '../assets/skills/frameworks.png'
import databasesBg from '../assets/skills/databases.png'
import devopsBg from '../assets/skills/devops.png'

export default function Skills({ skills }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const buckets = [
    { title: 'Languages', items: skills.languages, color: 'lime-100', bg: languagesBg },
    { title: 'Frameworks & Tools', items: skills.frameworks, color: 'lime-100', bg: frameworksBg },
    { title: 'Databases', items: skills.dbs, color: 'lime-100', bg: databasesBg },
    { title: 'DevOps & Cloud', items: skills.devops, color: 'lime-100', bg: devopsBg },
  ]

  // Fan configuration
  const cardWidth = 260
  const totalCards = buckets.length
  const centerIndex = (totalCards - 1) / 2

  const getCardVariants = (index) => {
    const offset = index - centerIndex
    const isHovered = hoveredIndex === index
    const isAnyHovered = hoveredIndex !== null

    // Base transform values
    const baseRotate = offset * 8
    const baseX = offset * 160
    const baseY = Math.abs(offset) * 15

    if (isHovered) {
      return {
        zIndex: 50,
        x: baseX,
        y: -60,
        rotate: 0,
        scale: 1.1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }
    }

    return {
      zIndex: index + 1,
      x: baseX,
      y: baseY,
      rotate: baseRotate,
      scale: 1,
      opacity: 1,
      filter: isAnyHovered && !isHovered ? "blur(2px) brightness(0.8)" : "none",
      transition: { type: "spring", stiffness: 200, damping: 25 }
    }
  }

  return (
    <section id="skills" className="space-y-12 py-12 overflow-visible" ref={ref}>
      <div className="mb-8 text-center">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4 text-lime-100 justify-center">
          Technical Skills
        </EyebrowText>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona text-lime-100"
        >
          WHAT I USE
        </motion.h2>
      </div>

      {/* Mobile View (Grid) */}
      <div className="grid md:hidden grid-cols-1 gap-6">
        {buckets.map((b, i) => (
          <motion.div
            key={i}
            className="card-lando gradient-border bg-white/5 border-white/10 p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute inset-0 -z-10">
              <img src={b.bg} alt="" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-[#1a1a1a]/80" />
            </div>
            <h3 className="text-xl font-bold text-lime-100 mb-4 relative z-10">{b.title}</h3>
            <div className="flex flex-wrap gap-2">
              {b.items.map((item, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View (Fan) */}
      <div className="hidden md:flex relative h-[600px] justify-center items-center perspective-1000">
        {buckets.map((b, i) => (
          <motion.div
            key={i}
            className="absolute w-[280px] h-[420px] rounded-[2.5rem] bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer shadow-2xl"
            style={{
              left: 'calc(50% - 140px)',
              top: 'calc(50% - 210px)',
              transformOrigin: 'center 80%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ y: 200, opacity: 0, rotate: 0 }}
            animate={isVisible ? getCardVariants(i) : { y: 200, opacity: 0 }}
            whileHover={{ zIndex: 100 }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {/* Card Background Image */}
            <div className="absolute inset-0">
              <img src={b.bg} alt="" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/60 to-[#1a1a1a]/90" />
            </div>

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-lime-100 mb-6 leading-tight uppercase font-mona">
                  {b.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {b.items.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                      <span className="text-lg font-medium">{item}</span>
                    </div>
                  ))}
                  {b.items.length > 6 && (
                    <div className="text-white/40 text-sm mt-2 italic">
                      + {b.items.length - 6} more
                    </div>
                  )}
                </div>
              </div>


            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
