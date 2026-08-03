import { RetroGrid } from "@/components/ui/retro-grid"
import { KineticText } from "@/components/ui/kinetic-text"
import { useEffect, useRef, useState } from "react"
import { animate, useInView, useMotionValue, useTransform, useScroll, motion, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { SmartImage } from "@/components/ui/SmartImage"

interface ContentItem {
  img: string
  link: string
  views?: string
}

const contentItems: ContentItem[] = [
  { img: "/reel1.png", link: "https://www.instagram.com/reel/DaNr4dtoiKS/", views: "107K" },
  { img: "/reel2.png", link: "https://www.instagram.com/reel/DYh4dW2Iub9/", views: "240K" },
  { img: "/reel3.png", link: "https://www.instagram.com/reel/DY7q8QXIh3M/", views: "189K" },
  { img: "/reel4.png", link: "https://www.instagram.com/reel/DZQPXumI6eq/", views: "15.6K" },
  { img: "/reel5.png", link: "https://www.instagram.com/reel/DXZruOliHtf/", views: "320K" },
  { img: "/reel6.png", link: "https://www.instagram.com/reel/DXEovZ7iHca/", views: "85K" }
]

const contentLoop = [...contentItems, ...contentItems]

function Counter({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const formatted = useTransform(count, (latest) => Math.round(latest).toLocaleString() + "+")

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" })
    }
  }, [count, inView, to, duration])

  return <motion.span ref={ref}>{formatted}</motion.span>
}

type ColumnProps = {
  items: ContentItem[]
  y: MotionValue<string>
  className?: string
}

const Column = ({ items, y, className }: ColumnProps) => {
  return (
    <motion.div
      className={cn("relative flex h-full w-full sm:w-auto flex-1 min-w-[200px] sm:min-w-[250px] flex-col gap-[2vw]", className)}
      style={{ y }}
    >
      {items.map((item, i) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={i}
          className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 ring-1 ring-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] bg-neutral-900 group block cursor-pointer"
        >
          <SmartImage
            src={item.img}
            alt="Content creation showcase"
            imgClassName="brightness-[0.9] contrast-[1.08] saturate-[0.86] transition-transform duration-500 group-hover:scale-105"
            skeletonClassName="bg-neutral-800"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] rounded-2xl" />
          <div className="pointer-events-none absolute top-3 left-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white/85">
            REEL
          </div>
          {item.views && (
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-medium text-white/80">
              {item.views}
            </div>
          )}
        </a>
      ))}
    </motion.div>
  )
}

export default function ContentCreationSection() {
  const containerRef = useRef<HTMLElement>(null)
  const gallery = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: starsScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "-25%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const y4 = useTransform(scrollYProgress, [0, 1], ["-25%", "-5%"])
  const yCloud3 = useTransform(starsScroll, [0, 1], ["-20%", "45%"])

  // Horizontal scroll marquees for mobile
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -350])
  const x2 = useTransform(scrollYProgress, [0, 1], [-350, 0])

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", resize)
    resize()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section ref={containerRef} id="content-creation" className="relative flex flex-col items-center justify-start w-full overflow-hidden bg-black pb-0">
      <div className="relative flex w-full flex-col items-center justify-start overflow-hidden pt-28 min-h-[720px] md:min-h-[780px]">
        <RetroGrid
          className="z-0"
          angle={65}
          cellSize={48}
          opacity={0.18}
          lightLineColor="#75C5DE"
          darkLineColor="#75C5DE"
        />

        {/* Vignette to let the grid recede and keep focus on content */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,transparent_0%,rgba(0,0,0,0.75)_75%)] pointer-events-none" />

        {/* Cloud 3: below the second marquee (top right of section), behind text */}
        <motion.img
          src="/cloud-nobg.png"
          alt="Minecraft Cloud 3"
          style={{ y: yCloud3 }}
          className="absolute right-[8%] top-[2%] w-[260px] md:w-[400px] h-auto opacity-[0.32] pointer-events-none z-[2]"
        />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-4">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#75C5DE] shadow-[0_0_8px_2px_rgba(117,197,222,0.6)]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-300 font-medium">
              Content Creator
            </span>
          </motion.div>

          <h2 className="content-creator-title text-4xl md:text-[clamp(40px,5.5vw,80px)] font-[400] text-[#F4F1E8] tracking-tight">
            <img src="/diamond_sword.png" className="content-creator-accent" alt="Diamond Sword" />
            <KineticText text="Tech Content Creator" as="span" />
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mt-5 mb-10 leading-relaxed">
            I create funny and valuable content breaking down hackathons, AI, and the tech world.
          </p>

          {/* Inline stat strip — no card chrome, just a clean credibility row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 md:gap-10 mb-10"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight bg-gradient-to-b from-[#F4F1E8] to-[#F4F1E8]/60 bg-clip-text text-transparent">
                <Counter to={3000000} />
              </h3>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mt-1.5">
                Total Views
              </p>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight bg-gradient-to-b from-[#F4F1E8] to-[#F4F1E8]/60 bg-clip-text text-transparent">
                <Counter to={2300} />
              </h3>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mt-1.5">
                Followers
              </p>
            </div>
          </motion.div>

          {/* CTA pill */}
          <motion.a
            href="https://instagram.com/gopalshewale41"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-[#F4F1E8] backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.06] mb-24"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(117,197,222,0.25), transparent 30%)",
              }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2.5c-2.6 0-2.93.01-3.95.06-1.02.05-1.72.21-2.33.45a4.7 4.7 0 0 0-1.7 1.1 4.7 4.7 0 0 0-1.1 1.7c-.24.61-.4 1.31-.45 2.33C2.42 9.07 2.4 9.4 2.4 12s.01 2.93.06 3.95c.05 1.02.21 1.72.45 2.33a4.7 4.7 0 0 0 1.1 1.7 4.7 4.7 0 0 0 1.7 1.1c.61.24 1.31.4 2.33.45 1.02.05 1.35.06 3.95.06s2.93-.01 3.95-.06c1.02-.05 1.72-.21 2.33-.45a4.7 4.7 0 0 0 1.7-1.1 4.7 4.7 0 0 0 1.1-1.7c.24-.61.4-1.31.45-2.33.05-1.02.06-1.35.06-3.95s-.01-2.93-.06-3.95c-.05-1.02-.21-1.72-.45-2.33a4.7 4.7 0 0 0-1.1-1.7 4.7 4.7 0 0 0-1.7-1.1c-.61-.24-1.31-.4-2.33-.45C14.93 2.51 14.6 2.5 12 2.5Zm0 1.8c2.56 0 2.86.01 3.87.06.93.04 1.44.2 1.78.33.45.17.77.38 1.1.72.34.33.55.65.72 1.1.13.34.29.85.33 1.78.05 1.01.06 1.31.06 3.87s-.01 2.86-.06 3.87c-.04.93-.2 1.44-.33 1.78-.17.45-.38.77-.72 1.1-.33.34-.65.55-1.1.72-.34.13-.85.29-1.78.33-1.01.05-1.31.06-3.87.06s-2.86-.01-3.87-.06c-.93-.04-1.44-.2-1.78-.33a2.9 2.9 0 0 1-1.1-.72 2.9 2.9 0 0 1-.72-1.1c-.13-.34-.29-.85-.33-1.78-.05-1.01-.06-1.31-.06-3.87s.01-2.86.06-3.87c.04-.93.2-1.44.33-1.78.17-.45.38-.77.72-1.1.33-.34.65-.55 1.1-.72.34-.13.85-.29 1.78-.33 1.01-.05 1.31-.06 3.87-.06Z" fill="currentColor" />
              <path d="M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM17.8 7.2a1.08 1.08 0 1 1-2.15 0 1.08 1.08 0 0 1 2.15 0Z" fill="currentColor" />
            </svg>
            <span>@gopalshewale41</span>
          </motion.a>
        </div>
      </div>

      {/* Parallax Content Gallery / Carousel */}
      {isMobile ? (
        /* Mobile-only Horizontal Scroll Marquees */
        <div
          ref={gallery}
          className="relative w-full box-border flex flex-col gap-6 overflow-hidden bg-[#130c24] py-10 border-t border-b border-white/5"
        >
          {/* Top/Bottom Fade Blend Overlays */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent z-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

          {/* Left/Right side fade overlays for horizontal seamlessness */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/80 to-transparent z-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/80 to-transparent z-30 pointer-events-none" />

          {/* Row 1: Scrolling Left */}
          <motion.div
            style={{ x: x1 }}
            className="flex gap-4 w-max px-4"
          >
            {contentItems.map((item, i) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={`r1-${i}`}
                className="relative h-[200px] aspect-[9/16] overflow-hidden rounded-xl border border-white/15 ring-1 ring-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.4)] bg-neutral-900 group block cursor-pointer flex-shrink-0"
              >
                <SmartImage
                  src={item.img}
                  alt="Content creation showcase"
                  imgClassName="brightness-[0.9] contrast-[1.08] saturate-[0.86]"
                  skeletonClassName="bg-neutral-800"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
              </a>
            ))}
          </motion.div>

          {/* Row 2: Scrolling Right */}
          <motion.div
            style={{ x: x2 }}
            className="flex gap-4 w-max px-4"
          >
            {[...contentLoop].reverse().map((item, i) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={`r2-${i}`}
                className="relative h-[200px] aspect-[9/16] overflow-hidden rounded-xl border border-white/15 ring-1 ring-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.4)] bg-neutral-900 group block cursor-pointer flex-shrink-0"
              >
                <SmartImage
                  src={item.img}
                  alt="Content creation showcase"
                  imgClassName="brightness-[0.9] contrast-[1.08] saturate-[0.86]"
                  skeletonClassName="bg-neutral-800"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
              </a>
            ))}
          </motion.div>
        </div>
      ) : (
        /* Desktop-only Parallax Content Gallery */
        <div
          ref={gallery}
          className="relative w-full box-border flex h-[100vh] md:h-[240vh] gap-[2vw] overflow-hidden bg-[#130c24] px-6 md:px-10 lg:px-14 py-[2vw] border-t border-b border-white/5"
        >
          {/* Side Fade Overlays to make edge clipping intentional */}
          <div className="absolute top-0 left-0 w-24 md:w-36 h-full bg-gradient-to-r from-[#130c24] via-[#130c24]/85 to-transparent z-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-36 h-full bg-gradient-to-l from-[#130c24] via-[#130c24]/85 to-transparent z-30 pointer-events-none" />

          {/* Top Fade Blend Overlay */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black via-black/70 to-transparent z-30 pointer-events-none" />

          {/* Bottom Fade Blend Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-30 pointer-events-none" />

          <Column items={[contentLoop[0], contentLoop[1], contentLoop[2], contentLoop[3], contentLoop[4]]} y={y} className="flex" />
          <Column items={[contentLoop[5], contentLoop[3], contentLoop[0], contentLoop[4], contentLoop[2]]} y={y2} className="hidden sm:flex" />
          <Column items={[contentLoop[1], contentLoop[4], contentLoop[5], contentLoop[0], contentLoop[3]]} y={y3} className="hidden md:flex" />
          <Column items={[contentLoop[2], contentLoop[0], contentLoop[3], contentLoop[1], contentLoop[5]]} y={y4} className="hidden lg:flex" />
        </div>
      )}
    </section>
  )
}