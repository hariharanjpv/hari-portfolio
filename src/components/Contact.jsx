import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TextReveal from './TextReveal'
import EyebrowText from './EyebrowText'

export default function Contact({ person }){
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState({ name: false, email: false, message: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent (local demo)')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="space-y-6" ref={ref}>
      <div className="mb-8">
        <EyebrowText delay={0.1} direction="right" color="lime" className="mb-4">
          Get In Touch
        </EyebrowText>
        <motion.h2 
          initial={{opacity:0, y:20}}
          animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:20}}
          transition={{ duration: 0.6 }}
          className="text-title-lg-mona"
        >
          <TextReveal delay={0.2} direction="right">Contact</TextReveal>
        </motion.h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="card gradient-border"
          initial={{opacity:0, x:-30}}
          animate={isVisible ? {opacity:1, x:0} : {opacity:0, x:-30}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{opacity:0}}
              animate={isVisible ? {opacity:1} : {opacity:0}}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm small-muted mb-1">Email</div>
              <a 
                href={`mailto:${person.email}`}
                className="font-semibold hover:underline block"
              >
                {person.email}
              </a>
            </motion.div>

            <motion.div
              initial={{opacity:0}}
              animate={isVisible ? {opacity:1} : {opacity:0}}
              transition={{ delay: 0.5 }}
            >
              <div className="text-sm small-muted mb-1">Phone</div>
              <a 
                href={`tel:${person.phone}`}
                className="font-semibold transition-colors block"
              >
                {person.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{opacity:0}}
              animate={isVisible ? {opacity:1} : {opacity:0}}
              transition={{ delay: 0.6 }}
            >
              <div className="text-sm small-muted mb-1">Location</div>
              <div className="font-semibold">{person.location}</div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.form 
          className="card gradient-border space-y-4"
          onSubmit={handleSubmit}
          initial={{opacity:0, x:30}}
          animate={isVisible ? {opacity:1, x:0} : {opacity:0, x:30}}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            initial={{opacity:0, y:10}}
            animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:10}}
            transition={{ delay: 0.5 }}
          >
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocused({...focused, name: true})}
              onBlur={() => setFocused({...focused, name: false})}
              className={`w-full p-3 rounded-md bg-white/40 border transition-all ${
                focused.name ? 'border-lime-100 shadow-lg shadow-lime-100/20' : 'border-black/10'
              } focus:outline-none`}
              placeholder="Your name"
            />
          </motion.div>
          
          <motion.div
            initial={{opacity:0, y:10}}
            animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:10}}
            transition={{ delay: 0.6 }}
          >
            <input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused({...focused, email: true})}
              onBlur={() => setFocused({...focused, email: false})}
              className={`w-full p-3 rounded-md bg-transparent border transition-all ${
                focused.email ? 'border-neon-300 shadow-lg shadow-neon-300/20' : 'border-white/6'
              } focus:outline-none`}
              placeholder="Your email"
            />
          </motion.div>
          
          <motion.div
            initial={{opacity:0, y:10}}
            animate={isVisible ? {opacity:1, y:0} : {opacity:0, y:10}}
            transition={{ delay: 0.7 }}
          >
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocused({...focused, message: true})}
              onBlur={() => setFocused({...focused, message: false})}
              className={`w-full p-3 rounded-md bg-white/40 border transition-all resize-none ${
                focused.message ? 'border-lime-100 shadow-lg shadow-lime-100/20' : 'border-black/10'
              } focus:outline-none`}
              rows={4} 
              placeholder="Message"
            />
          </motion.div>
          
          <motion.div 
            className="flex justify-end"
            initial={{opacity:0}}
            animate={isVisible ? {opacity:1} : {opacity:0}}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              type="submit"
              className="px-6 py-3 rounded-md bg-lime-100 text-black font-semibold shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(210,255,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-20">Send Message</span>
              <motion.div
                className="absolute inset-0 bg-lime-200 z-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}
