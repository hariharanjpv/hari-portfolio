import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function HelmetGrid({ items = [], title, eyebrow }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Default items if none provided
  const defaultItems = [
    { id: 1, title: 'Project 1', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop' },
    { id: 2, title: 'Project 2', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop' },
    { id: 3, title: 'Project 3', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop' },
    { id: 4, title: 'Project 4', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop' },
  ]

  const gridItems = items.length > 0 ? items : defaultItems

  return (
    <div className="helmet-grid w-full">
      {/* Title as first grid item if provided */}
      {title && (
        <motion.div
          className="helmet-grid-item-w relative md:col-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0, duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
        >
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
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 z-10">
            {eyebrow && (
              <div className="text-eyebrow mb-4">{eyebrow}</div>
            )}
            <div className="text-title-lg-mona">{title}</div>
          </div>
        </motion.div>
      )}
      
      {gridItems.map((item, idx) => (
        <motion.div
          key={item.id || idx}
          className="helmet-grid-item-w relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
        >
          {/* Frame overlay - appears on hover */}
          <motion.div
            className="helmet-grid-frame is-overlay absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
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

          {/* Image container */}
          <div className="helmet-grid-item-img-w absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="helmet-grid-item-img-helmet-w w-full h-full flex items-center justify-center overflow-hidden">
              <motion.img
                src={item.image}
                alt={item.title}
                className="helmet-grid-item-img-helmet w-full h-full object-cover"
                animate={{ 
                  scale: hoveredIndex === idx ? 1.1 : 1 
                }}
                transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
              />
            </div>
          </div>

          {/* Reveal image on hover - Lando style */}
          <motion.div
            className="helmet-grid-item-reveal-img absolute inset-0 z-5 pointer-events-none"
            style={{
              clipPath: hoveredIndex === idx ? 'ellipse(100% 120% at 50% 0%)' : 'ellipse(0% 0% at 50% 0%)',
              transition: 'clip-path 0.75s cubic-bezier(0.65, 0.05, 0, 1)'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Title overlay */}
          {item.title && (
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
              <div className="text-eyebrow text-white/80">{item.title}</div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

