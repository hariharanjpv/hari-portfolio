import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Marquee from './components/Marquee'
import { person } from './data/resume'

export default function App() {
  return (
    <Layout person={person}>
      <Hero person={person} />
      <Marquee />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24 relative z-10">
        <Experience items={person.experience} />
        <Projects items={person.projects} />
        <Skills skills={person.skills} />
        <Awards items={person.awards} />
        <Contact person={person} />
      </main>
    </Layout>
  )
}
