import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import EyebrowText from './EyebrowText'

const ExperienceCard = ({ item, index, isLeft }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`flex items-start justify-between w-full mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Spacer for the other side */}
      <div className="hidden md:block w-5/12" />

      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 mt-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-4 h-4 bg-lime-400 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.8)] z-10 cursor-pointer hover:scale-125 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-75" />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5 // Stagger the floating animation
          }}
          className={`
            relative overflow-hidden rounded-2xl p-6 cursor-pointer
            backdrop-blur-md bg-white/30 border border-white/20 shadow-lg
            hover:shadow-xl hover:bg-white/40 transition-all duration-300
            group
          `}
          onClick={() => setIsOpen(!isOpen)}
          layout
        >
          {/* Frosted Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />

          <motion.div layout className="relative z-10 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <motion.span layout className="text-lime-600 font-mono text-sm tracking-wider font-bold block mb-1">
                  {item.period}
                </motion.span>
                <motion.h3 layout className="text-2xl font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
                  {item.role}
                </motion.h3>
                <motion.div layout className="text-gray-700 font-medium">
                  {item.company}
                </motion.div>
              </div>

              {/* Expand Icon */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-gray-400 mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200/50 mt-4">
                    <div className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      {item.location}
                    </div>
                    <p className="text-gray-500 text-sm mb-4 italic">{item.product}</p>

                    <ul className="space-y-2">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime-500 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Experience({ items }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  })

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="mb-16 text-center">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4 justify-center">
          Career Path
        </EyebrowText>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-title-lg-mona text-gray-900"
        >
          MY JOURNEY
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 min-h-[600px]">
        {/* Central Timeline Line (Desktop) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2">
          <motion.div
            style={{ height }}
            className="w-full bg-gradient-to-b from-lime-500 via-lime-300 to-transparent shadow-[0_0_15px_rgba(163,230,53,0.5)]"
          />
        </div>

        <div className="relative z-10 space-y-8">
          {items.map((item, index) => (
            <ExperienceCard
              key={index}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
