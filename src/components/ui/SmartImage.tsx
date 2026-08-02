import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SmartImageProps {
    src: string
    alt: string
    className?: string
    imgClassName?: string
    containerClassName?: string
    skeletonClassName?: string
    loading?: "lazy" | "eager"
    onLoad?: () => void
}

/**
 * SmartImage — wraps <img> with a skeleton/blur placeholder that shows
 * until the image fully loads, then crossfades in. Prevents the "painting
 * in part by part" progressive JPEG/PNG effect.
 */
export function SmartImage({
    src,
    alt,
    className,
    imgClassName,
    containerClassName,
    skeletonClassName,
    loading = "lazy",
    onLoad,
}: SmartImageProps) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div
            className={cn(
                "relative overflow-hidden w-full h-full",
                containerClassName,
                className,
            )}
        >
            {!loaded && (
                <div
                    className={cn(
                        "absolute inset-0 animate-pulse bg-neutral-800",
                        skeletonClassName,
                    )}
                />
            )}
            <img
                src={src}
                alt={alt}
                loading={loading}
                onLoad={() => {
                    setLoaded(true)
                    onLoad?.()
                }}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    loaded ? "opacity-100" : "opacity-0",
                    imgClassName,
                )}
            />
        </div>
    )
}

/**
 * useImagePreload — returns true once the image at `src` is fully loaded.
 * Use to gate sections (like the hero) behind image readiness.
 * Uses useEffect to avoid infinite re-render loops.
 */
export function useImagePreload(src: string) {
    const [loaded, setLoaded] = useState(false)
    const loadedRef = useRef(false)

    useEffect(() => {
        // Reset if src changes
        if (loadedRef.current) {
            loadedRef.current = false
            setLoaded(false)
        }

        const img = new Image()
        img.onload = () => {
            if (!loadedRef.current) {
                loadedRef.current = true
                setLoaded(true)
            }
        }
        img.onerror = () => {
            if (!loadedRef.current) {
                loadedRef.current = true
                setLoaded(true) // still show content even if image fails
            }
        }
        img.src = src

        // If already cached, onload may fire synchronously — the guard handles it
        return () => {
            img.onload = null
            img.onerror = null
        }
    }, [src])

    return loaded
}
