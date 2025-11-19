import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'

export default function Projects({ items }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })
  const [expandedIndex, setExpandedIndex] = useState(null)
  const detailsRef = useRef(null)
  const gridRef = useRef(null)
  const cardRef = useRef(null)
  const [cardDimensions, setCardDimensions] = useState({ width: 480, height: 300 })
  const [showBorder, setShowBorder] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])

  const isInitialMount = useRef(true)
  const lastClicked = useRef(false)

  // Focus projects section by centering the projects grid in the viewport
  const focusProjectsSection = () => {
    const headerEl = document.querySelector('header, .topbar, nav')
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80
    if (!gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    const elementCenterAbs = window.scrollY + rect.top + rect.height / 2
    const desiredVisibleCenterPixel = Math.round((window.innerHeight + headerHeight) / 2)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    let targetY = Math.max(0, Math.round(elementCenterAbs - desiredVisibleCenterPixel))
    if (targetY > maxScroll) targetY = maxScroll
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const handleFolderClick = (idx) => {
    lastClicked.current = true
    setShowBorder(false)
    if (expandedIndex === idx) {
      // clicking the already-opened folder -> collapse then focus projects
      setExpandedIndex(null)
      setTimeout(() => {
        focusProjectsSection()
      }, 360)
    } else {
      setExpandedIndex(idx)
    }
  }

  // Scroll only when user clicks to expand/collapse. Prevent auto-scroll on initial mount.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (!lastClicked.current) return

    const headerEl = document.querySelector('header, .topbar, nav')
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80
    const desiredVisibleCenterPixel = (window.innerHeight + headerHeight) / 2

    if (expandedIndex !== null) {
      // Wait for the folder + card animation to complete before measuring/scrolling
      const t = setTimeout(() => {
        if (detailsRef.current) {
          const rect = detailsRef.current.getBoundingClientRect()
          const elementCenterAbs = window.scrollY + rect.top + rect.height / 2
          const targetY = Math.max(0, Math.round(elementCenterAbs - desiredVisibleCenterPixel))
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
        lastClicked.current = false
      }, 950)
      return () => clearTimeout(t)
    } else if (expandedIndex === null && gridRef.current) {
      const t = setTimeout(() => {
        if (gridRef.current) {
          const rect = gridRef.current.getBoundingClientRect()
          const elementCenterAbs = window.scrollY + rect.top + rect.height / 2
          const targetY = Math.max(0, Math.round(elementCenterAbs - desiredVisibleCenterPixel))
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
        lastClicked.current = false
      }, 360)
      return () => clearTimeout(t)
    }
  }, [expandedIndex])

  // Measure card dimensions and trigger border animation after card renders
  useEffect(() => {
    if (expandedIndex !== null) {
      const timer = setTimeout(() => {
        // ensure the card is mounted before measuring
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect()
          setCardDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) })
          setShowBorder(true)
        }
      }, 900) // Delay after card animation completes
      return () => clearTimeout(timer)
    } else {
      setShowBorder(false)
    }
  }, [expandedIndex])

  // Top-bar click listener: focus projects when top-bar Projects is clicked
  useEffect(() => {
    const handler = (e) => {
      let el = e.target
      while (el && el !== document) {
        if (el.tagName === 'A' && el.getAttribute('href') === '#projects') {
          e.preventDefault()
          lastClicked.current = true
          focusProjectsSection()
          return
        }
        if (el.dataset && el.dataset.scrollTo === 'projects') {
          e.preventDefault()
          lastClicked.current = true
          focusProjectsSection()
          return
        }
        el = el.parentElement
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  // Disable page scroll while a project is open, restore when closed
  useEffect(() => {
    // store original styles to restore later
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (expandedIndex !== null) {
      // Compensate for scrollbar disappearance to avoid layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [expandedIndex])

  const handleFolderHover = (idx, isHovering) => {
    setHoveredIndex(isHovering ? idx : null)
  }

  return (
    <section id="projects" className="space-y-6 relative" ref={ref}>
      {/* Section Title */}
      <div className="mb-8 text-center">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4 justify-center">
          Featured Work
        </EyebrowText>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona"
        >
          <TextReveal delay={0.2} direction="right">Projects</TextReveal>
        </motion.h2>
      </div>

      {/* Folder Grid - using flex layout for intelligent wrapping */}
      <div ref={gridRef} className="w-full mb-12 relative flex flex-wrap gap-6 items-start">
        {items.map((p, idx) => (
          expandedIndex === idx ? null : (
            <div key={idx} className="relative flex-shrink-0" style={{ width: '220px', perspective: '1200px' }}>
              <motion.div
                className="helmet-grid-item-w relative cursor-pointer w-full flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0.9,
                }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
                onClick={() => handleFolderClick(idx)}
                onMouseEnter={() => handleFolderHover(idx, true)}
                onMouseLeave={() => handleFolderHover(idx, false)}
                style={{
                  y: idx % 2 === 0 ? y1 : y2,
                  boxShadow: hoveredIndex === idx ? '0 0 30px rgba(210,255,0,0.4), 0 0 60px rgba(210,255,0,0.2)' : 'none',
                  transition: 'box-shadow 0.3s ease-in-out',
                  minHeight: '260px',
                }}
              >
                {/* Folder frame overlay */}
                <motion.div
                  className="helmet-grid-frame is-overlay absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 407 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 1h390.89a7 7 0 0 1 7 7v356.983a7 7 0 0 1-7 7H263.329a23.999 23.999 0 0 0-18.766 9.038l-16.499 20.694A21.999 21.999 0 0 1 210.862 410H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Z"
                      stroke="var(--color--lime)"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.div>
                {/* Base frame */}
                <div className="helmet-grid-frame is-base absolute inset-0" style={{ color: 'var(--color--dark-green-tint-2)' }}>
                  <svg width="100%" height="100%" viewBox="0 0 407 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 1h390.89a7 7 0 0 1 7 7v356.983a7 7 0 0 1-7 7H263.329a23.999 23.999 0 0 0-18.766 9.038l-16.499 20.694A21.999 21.999 0 0 1 210.862 410H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                {/* Folder icon and title */}
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="16" width="32" height="20" rx="4" fill="#d2ff00" stroke="#282c20" strokeWidth="2" />
                      <rect x="12" y="12" width="12" height="8" rx="2" fill="#b2c73a" stroke="#282c20" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4 right-4 z-30">
                    <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-md inline-block">
                      <div className="text-eyebrow text-white font-semibold">{p.title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )
        ))}
      </div>

      {/* Animated dark overlay background */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ width: 0, backgroundColor: 'rgba(20,20,20,0.7)' }}
            animate={{ width: '100vw', backgroundColor: 'rgba(20,20,20,0.7)' }}
            exit={{ width: 0, backgroundColor: 'rgba(245,245,220,0.95)' }}
            transition={{ width: { duration: 0.6, ease: 'easeInOut' }, backgroundColor: { duration: 0.4 } }}
            style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 40, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Expanded folder row - centered, with animated parenthesis and details */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            key={expandedIndex}
            ref={detailsRef}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.65, 0.05, 0, 1] }}
            className="w-full flex flex-col items-center justify-center mb-12"
            style={{ position: 'relative', zIndex: 50 }}
          >
            {/* Centered folder with folder frame */}
            <motion.div
              className="helmet-grid-item-w relative cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleFolderClick(expandedIndex)}
              style={{ width: '220px', perspective: '1200px', minHeight: '260px' }}
            >
              {/* Folder frame overlay */}
              <motion.div
                className="helmet-grid-frame is-overlay absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 407 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 1h390.89a7 7 0 0 1 7 7v356.983a7 7 0 0 1-7 7H263.329a23.999 23.999 0 0 0-18.766 9.038l-16.499 20.694A21.999 21.999 0 0 1 210.862 410H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Z"
                    stroke="var(--color--lime)"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
              {/* Base frame */}
              <div className="helmet-grid-frame is-base absolute inset-0" style={{ color: 'var(--color--dark-green-tint-2)' }}>
                <svg width="100%" height="100%" viewBox="0 0 407 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 1h390.89a7 7 0 0 1 7 7v356.983a7 7 0 0 1-7 7H263.329a23.999 23.999 0 0 0-18.766 9.038l-16.499 20.694A21.999 21.999 0 0 1 210.862 410H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="16" width="32" height="20" rx="4" fill="#d2ff00" stroke="#282c20" strokeWidth="2" />
                    <rect x="12" y="12" width="12" height="8" rx="2" fill="#b2c73a" stroke="#282c20" strokeWidth="2" />
                  </svg>
                </div>
                <div className="absolute top-4 left-4 right-4 z-30">
                  <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-md inline-block">
                    <div className="text-eyebrow text-white font-semibold">{items[expandedIndex].title}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details panel and border wrapper */}
            <motion.div
              className="relative w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '16px', marginBottom: '16px', position: 'relative', paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              {/* Animated border drawing effect - overlay on top of card */}
              <motion.svg
                width={cardDimensions.width + 40}
                height={cardDimensions.height + 40}
                viewBox={`0 0 ${cardDimensions.width + 40} ${cardDimensions.height + 40}`}
                fill="none"
                animate={{ opacity: showBorder ? 1 : 0 }}
                transition={{ opacity: { duration: 0.3 } }}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, pointerEvents: 'none' }}
              >
                <motion.rect
                  x="10" y="10"
                  width={cardDimensions.width + 20}
                  height={cardDimensions.height + 20}
                  rx="24"
                  stroke="#d2ff00"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={showBorder ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 0 8px #d2ff00)' }}
                />
              </motion.svg>

              {/* Details panel - card content */}
              <motion.div
                ref={cardRef}
                className="backdrop-blur-md bg-gray-100/40 border border-gray-200/30 shadow-lg p-6 flex flex-col justify-center items-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, delay: 0.15 }}
                whileHover={{}}
                style={{ width: '100%', margin: '0 auto', zIndex: 2, borderRadius: '24px', willChange: 'opacity' }}
              >
                {/* Frosted Glass Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-50 pointer-events-none rounded-3xl" />
                <div className="space-y-4 w-full relative z-10">
                  <div>
                    <div className="text-sm small-muted mb-1">{items[expandedIndex].period}</div>
                    <div className="font-semibold text-xl mb-2">
                      <TextReveal delay={0.1} direction="right">{items[expandedIndex].title}</TextReveal>
                    </div>
                    {items[expandedIndex].subtitle && (
                      <div className="text-sm small-muted mb-3">{items[expandedIndex].subtitle}</div>
                    )}
                    <div className="small-muted leading-relaxed">{items[expandedIndex].desc}</div>
                  </div>
                  {items[expandedIndex].tech && (
                    <div className="flex flex-wrap gap-2">
                      {items[expandedIndex].tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-md bg-lime-100/20 border border-lime-100/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <motion.a
                      href="#"
                      className="px-4 py-2 rounded-md border border-lime-100/30 small-muted hover:bg-lime-100/10 hover:border-lime-100 hover:text-lime-100 transition-all"


                    >
                      Case study
                    </motion.a>
                    <motion.a
                      href="#"
                      className="px-4 py-2 rounded-md border border-lime-100/30 small-muted hover:bg-lime-100/10 hover:border-lime-100 hover:text-lime-100 transition-all"


                    >
                      Repo
                    </motion.a>
                  </div>
                  {/* Collapse button */}
                  <div className="flex justify-end pt-4">
                    <motion.button
                      className="px-4 py-2 rounded-md border border-lime-100/30 small-muted bg-black/10 hover:bg-lime-100/10 hover:border-lime-100 hover:text-lime-100 transition-all"


                      onClick={() => {
                        setExpandedIndex(null)
                        setTimeout(() => focusProjectsSection(), 360)
                      }}
                    >
                      Collapse
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
