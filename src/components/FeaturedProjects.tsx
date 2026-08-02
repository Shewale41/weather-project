import { KineticText } from "@/components/ui/kinetic-text"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { SmartImage } from "@/components/ui/SmartImage"

interface ProjectItem {
  src: string
  alt: string
  title: string
  description: string
  demoLink: string
  demoLabel?: string
  repoLink: string
}

const projects: ProjectItem[] = [
  {
    src: "/breakeven_thumbnail.png",
    alt: "Monte Carlo Simulator",
    title: "BreakEven",
    description: `"A 100% client-side financial decision-support tool that answers "should I rent or buy?" using a Monte Carlo simulation — thousands of randomized market scenarios — instead of the single deterministic projection every other online calculator uses."`,
    demoLink: "https://breakeven-tan.vercel.app/",
    demoLabel: "Demo link",
    repoLink: "https://github.com/Shewale41/BreakEven",
  },
  {
    src: "/floatchat_thumbnail.png",
    alt: "Ocean Data Discovery Platform",
    title: "FloatChat",
    description: "Developed production-grade platform for Government of India’s ARGO Ocean Data program  enabling efficient access to large-scale marine datasets.",
    demoLink: "https://paani-frontend-df4m.vercel.app/",
    demoLabel: "Live link",
    repoLink: "https://github.com/Shewale41/floatchat",
  },
  {
    src: "/namma_weather.png",
    alt: "Blockchain-Based Disaster Relief System",
    title: "Sahaya",
    description: "decentralized system for transparent disaster relief fund distribution using Solidity smart contracts for campaign management, NGO verification, and fund tracking.",
    demoLink: "https://github.com/Shewale41/sahaya",
    demoLabel: "Report link",
    repoLink: "https://github.com/Shewale41/sahaya",
  },
  {
    src: "/numpy.png",
    alt: "AI Lecture & Study Notes",
    title: "EDURA",
    description: "full-stack application for automatic lecture transcription and AI-generated study notes using OpenAI Whisper and Gemini API, reducing manual note-taking time by 50%, supporting Hindi and English.",
    demoLink: "https://github.com/Shewale41/noteGenie",
    demoLabel: "Demo link",
    repoLink: "https://github.com/Shewale41/noteGenie",
  },
]

export default function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax transforms for the clouds
  const yCloud1 = useTransform(scrollYProgress, [0, 1], ["-25%", "45%"])
  const yCloud2 = useTransform(scrollYProgress, [0, 1], ["40%", "-30%"])

  const visibleProjects = projects.slice(0, 2)
  const extraProjects = projects.slice(2)

  return (
    <section ref={ref} id="featured-projects" className="featured-projects-section relative overflow-hidden bg-black">

      {/* Cloud 1: below first marquee (top right of section), behind text */}
      <motion.img
        src="/cloud-nobg.png"
        alt="Minecraft Cloud 1"
        style={{ y: yCloud1 }}
        className="absolute right-[2%] top-[5%] w-[280px] md:w-[450px] h-auto opacity-[0.35] pointer-events-none z-[2]"
      />

      {/* Cloud 2: behind projects at the left (lower left of section), behind cards */}
      <motion.img
        src="/cloud-nobg.png"
        alt="Minecraft Cloud 2"
        style={{ y: yCloud2 }}
        className="absolute left-[-5%] bottom-[15%] w-[320px] md:w-[500px] h-auto opacity-[0.3] pointer-events-none z-[2]"
      />

      <div className="featured-projects-container relative z-10 w-full flex flex-col items-center">
        <div className="featured-projects-header text-center flex flex-col items-center w-full max-w-5xl">
          <h2 className="featured-projects-title">
            <img src="/enchantedbook.png" className="featured-projects-accent" alt="Enchanted Book" />
            <KineticText text="Featured Projects" as="span" className="font-[400]" />
          </h2>
          <p className="featured-projects-desc">
            A mix of products, experiments, and client-style builds where I focus on practical AI workflows, clean
            engineering, and experiences that feel smooth in real use.
          </p>
        </div>

        {/* 2-column wide breathing cards */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="mt-12 w-full max-w-6xl px-5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {visibleProjects.map((project, index) => (
            <BreathingProjectCard
              key={project.title}
              item={project}
              delay={index * 0.15}
            />
          ))}

          <AnimatePresence initial={false}>
            {expanded &&
              extraProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <BreathingProjectCard item={project} delay={0.3 + index * 0.15} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* View More / View Less toggle */}
        {extraProjects.length > 0 && (
          <motion.button
            onClick={() => {
              setExpanded((prev) => {
                const next = !prev
                if (!next) {
                  // Collapsing: smoothly bring the section back into view
                  // instead of letting the sudden height change jump the scroll.
                  requestAnimationFrame(() => {
                    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  })
                }
                return next
              })
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-medium text-[#F4F1E8] backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            {/* Soft rotating gradient glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent 30%)",
              }}
            />
            <span>{expanded ? "View Less" : "View More"}</span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <path
                d="M4 6.5L9 11.5L14 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        )}
      </div>
    </section>
  )
}

function BreathingProjectCard({ item, delay }: { item: ProjectItem; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0, 6, 0], scale: [1, 1.01, 1, 0.995, 1] }}
      transition={{ duration: 4.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay }}
      className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 flex flex-col select-none"
    >
      <div className="flex flex-col h-full w-full">
        <div className="relative w-full overflow-hidden bg-neutral-950 aspect-[16/10]">
          <SmartImage
            src={item.src}
            alt={item.alt}
            imgClassName="transition-transform duration-500 hover:scale-105"
            skeletonClassName="bg-neutral-800"
          />
        </div>

        <div className="px-5 py-4 bg-[#18181b] border-t border-white/5 text-left">
          <h3 className="text-lg md:text-xl leading-tight font-semibold text-[#F4F1E8] tracking-tight">{item.title}</h3>
          <p className="text-sm leading-snug text-gray-400 mt-2">{item.description}</p>
          <div className="mt-3 flex items-center gap-5 text-sm font-medium">
            <a
              href={item.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F4F1E8] hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item.demoLabel || "Live link"}</span>
            </a>
            <a
              href={item.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F4F1E8] hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 5L3 9L6 13M12 5L15 9L12 13M10 4L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Repo link</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}