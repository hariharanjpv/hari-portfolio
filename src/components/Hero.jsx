import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'
import ImpactText from './ImpactText'
import { useParallax } from '../hooks/useParallax'

const phrases = [
  "Backend Engineer",
  "Java · Spring Boot",
  "Distributed Systems",
  "Event Processing"
]

export default function Hero({ person }){
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll()
  const [parallaxRef, parallaxOffset] = useParallax(0.3)
  const [parallaxRef2, parallaxOffset2] = useParallax(-0.2)
  
  useEffect(() => {
    const t = setInterval(()=> setI(p => (p+1) % phrases.length), 2600)
    return () => clearInterval(t)
  },[])

  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Floating orbs with parallax */}
      <motion.div
        ref={parallaxRef}
        className="absolute top-20 left-10 w-32 h-32 bg-lime-100/15 rounded-full blur-3xl parallax-slow"
        style={{ y: y1, opacity }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        ref={parallaxRef2}
        className="absolute bottom-20 right-10 w-40 h-40 bg-lime-100/10 rounded-full blur-3xl parallax-fast"
        style={{ y: y2, opacity }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl w-full px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4">
                Backend Engineer
              </EyebrowText>
              <h1 className="text-title-lg-mona mb-6">
                {person.name.split(' ')[0]} <TextReveal delay={0.3} direction="right">
                  {person.name.split(' ')[1]}
                </TextReveal>
              </h1>
              <div className="mt-8 max-w-4xl">
                <ImpactText 
                  variant="lg-mona" 
                  direction="right" 
                  color="lime-off" 
                  delay={0.5}
                >
                  Building <strong>scalable</strong> systems{'\n'}that <strong>power</strong> the future
                </ImpactText>
              </div>
            </motion.div>
            <div className="mt-8">
              <motion.div 
                className="text-body-reg-mona max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {person.summary}
              </motion.div>
            </div>
            <motion.div 
              className="mt-10 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
                className="px-6 py-3 rounded-md bg-lime-100 text-black font-semibold shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(210,255,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-20">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-lime-200 z-10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="px-6 py-3 rounded-md border-2 border-lime-100/50 small-muted hover:border-lime-100 hover:text-lime-100 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-20">Contact</span>
                <motion.div
                  className="absolute inset-0 bg-lime-100/10 z-10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
