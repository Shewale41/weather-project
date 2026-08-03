"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MagicCard } from "@/components/ui/magic-card"

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"])

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-black px-4">
      {/* Parallax Background Image */}
      <motion.img
        src="/minecraft_moon_sky_1783862731421.png"
        alt="Minecraft Sky"
        style={{ y }}
        className="absolute inset-0 w-full h-[180%] -top-[40%] object-cover object-center z-0"
      />

      {/* Top Blending Overlay to fade the sky edge smoothly */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/60 to-transparent z-10 pointer-events-none" />

      {/* Grouping container to align Llama and Card perfectly */}
      <div className="relative z-10 w-full max-w-md mt-40">
        {/* Llama sitting directly on the card */}
        <img
          src="/llama-nobg.png"
          alt="Llama"
          className="absolute bottom-full left-1/2 -translate-x-1/2 w-full h-auto object-contain drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)] translate-y-[25px] sm:translate-y-[32px] md:translate-y-[45px]"
        />

        <MagicCard
          className="relative z-20 w-full h-72 sm:h-64 border-[#ffffff10] rounded-xl shadow-2xl bg-[#111111]"
          gradientColor="#332157"
          gradientSize={400}
        >
          <div className="flex h-full flex-col items-center justify-center px-6 text-center py-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Ready to collaborate?</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Let's build something extraordinary.</h2>
            <p className="mt-3 mb-6 max-w-sm text-sm text-white/75 sm:text-base">
              Whether you have a groundbreaking idea, a project to collaborate on,
                or just want to say hi — my inbox is always open.
            </p>
            {/* Desktop: single row with all 4 links. Mobile: first row has Gmail · LinkedIn · GitHub, second row has Instagram centered */}
            <div className="flex flex-col items-center gap-3 text-sm font-medium">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="mailto:shewalegopal4119@gmail.com" className="text-[#F4F1E8] hover:text-[#75C5DE] transition-colors">Gmail</a>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <a href="https://www.linkedin.com/in/gopal-shewale-a182052b5" target="_blank" rel="noopener noreferrer" className="text-[#F4F1E8] hover:text-[#75C5DE] transition-colors">LinkedIn</a>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <a href="https://github.com/Shewale41" target="_blank" rel="noopener noreferrer" className="text-[#F4F1E8] hover:text-[#75C5DE] transition-colors">GitHub</a>
                <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
                {/* <a href="https://instagram.com/gopalshewale41" target="_blank" rel="noopener noreferrer" className="text-[#F4F1E8] hover:text-[#75C5DE] transition-colors hidden sm:inline">Instagram</a> */}
              </div>
              {/* Instagram alone on mobile — centered beneath the row */}
              {/* <a href="https://instagram.com/gopalshewale41" target="_blank" rel="noopener noreferrer" className="text-[#F4F1E8] hover:text-[#75C5DE] transition-colors sm:hidden">Instagram</a> */}
            </div>
          </div>
        </MagicCard>
      </div>
    </section>
  )
}