import { ReactLenis } from 'lenis/react'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import FeaturedProjects from './components/FeaturedProjects'
import ContentCreationSection from './components/ContentCreationSection'
import CTASection from './components/CTASection'
import { SmoothCursor } from '@/components/ui/smooth-cursor'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.06, wheelMultiplier: 0.6, smoothWheel: true }}>
      <SmoothCursor />
      <div className="relative">
        <div className="splash" id="splash">
          <div className="splash-row splash-row-top">
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
          </div>
          <div className="splash-row splash-row-bottom">
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
            <div className="splash-box"></div>
          </div>
        </div>
        <Header />
        <Hero />
        <Marquee direction="left" />
        <FeaturedProjects />
        <Marquee direction="right" />
        {/* <ContentCreationSection /> */}
        <CTASection />
      </div>
    </ReactLenis>
  )
}

export default App
