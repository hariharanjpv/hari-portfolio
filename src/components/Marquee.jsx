import React from 'react'
import { motion } from 'framer-motion'

export default function Marquee({ items = [], direction = 'left', speed = 30 }) {
  const defaultItems = [
    'Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'Redis', 
    'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Microservices'
  ]

  const marqueeItems = items.length > 0 ? items : defaultItems
  const duplicatedItems = [...marqueeItems, ...marqueeItems]

  return (
    <div className="overflow-hidden relative w-full py-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear'
          }
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <span
            key={idx}
            className="text-title-lg-mona text-dark-green-tint-2/30 px-4"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

