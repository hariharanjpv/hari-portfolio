import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Particles from './Particles'
import ScrollProgress from './ScrollProgress'

export default function Layout({ children, person }){
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen relative bg-beige">
      <ScrollProgress />
      <Particles />
      <div className="w-full relative z-10">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-beige/95 backdrop-blur-md shadow-lg border-b border-black/5' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToTop()}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-black font-bold shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                JP
              </motion.div>
              <div>
                <div className="text-sm small-muted">Hariharan JP</div>
                <div className="text-xs small-muted">Backend Engineer</div>
              </div>
            </motion.div>
            <nav className="hidden md:flex gap-6">
              {['experience', 'projects', 'skills', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, `#${item}`)}
                  className="small-muted hover:text-lime-100 transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-100 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.header>
        {children}
        <footer className="max-w-6xl mx-auto px-6 py-8 small-muted text-center relative z-10">
          © {new Date().getFullYear()} {person?.name ?? 'Hariharan'}
        </footer>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-lime-100 text-black font-bold shadow-lg flex items-center justify-center cursor-pointer hover:shadow-lime transition-all"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  )
}
