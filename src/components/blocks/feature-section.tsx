import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 8000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3 })

  // Reset to first item whenever the section comes into view
  useEffect(() => {
    if (isInView) {
      setCurrentFeature(0)
      setProgress(0)
    }
  }, [isInView])

  // Scroll active item into view on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      const el = document.getElementById(`feature-item-${currentFeature}`);
      const slider = document.getElementById('feature-slider');
      if (el && slider) {
        slider.scrollTo({
          left: el.offsetLeft - slider.offsetLeft - 16,
          behavior: 'smooth'
        });
      }
    }
  }, [currentFeature]);

  useEffect(() => {
    if (!isInView) return; // Pause animation if not in view

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval, isInView])

  return (
    <div ref={containerRef} className={cn("py-0 pb-20 w-full", className)}>
      <div className="w-full">
        {title && (
          <h2 className="text-3xl md:text-5xl font-cormorant font-semibold mb-12 text-center text-dark">
            {title}
          </h2>
        )}

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 flex flex-row md:flex-col overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 md:gap-16 ml-0 md:ml-[120px] pb-4 w-full" id="feature-slider">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                id={`feature-item-${index}`}
                className="flex w-[85vw] shrink-0 md:w-auto items-start gap-6 md:gap-10 cursor-pointer snap-center"
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-12 h-12 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-300",
                    index === currentFeature
                      ? "bg-[#B89A0A] border-[#B89A0A] text-white scale-110 shadow-lg"
                      : "bg-transparent border-border text-mid",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold text-cream">✓</span>
                  ) : (
                    <span className="text-lg font-semibold font-sans">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1 mt-1 pr-6 md:pr-0">
                  <h3 className="text-xl md:text-2xl font-semibold font-cormorant text-dark">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-[15px] md:text-base text-dark font-sans mt-3 leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[300px] md:h-[420px] w-full overflow-hidden rounded-2xl shadow-sm border border-border"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ y: 50, opacity: 0, rotateX: -10 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -50, opacity: 0, rotateX: 10 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform duration-1000 scale-105 hover:scale-100"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
