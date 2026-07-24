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
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    if (isInView) {
      programmaticScrollRef.current = true;
      setCurrentFeature(0)
      setProgress(0)
    }
  }, [isInView])

  useEffect(() => {
    if (programmaticScrollRef.current && window.innerWidth < 768) {
      const el = document.getElementById(`mobile-feature-item-${currentFeature}`);
      const slider = document.getElementById('feature-slider');
      if (el && slider) {
        const scrollLeft = el.offsetLeft - slider.offsetLeft - (slider.clientWidth / 2) + (el.clientWidth / 2);
        slider.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
      programmaticScrollRef.current = false;
    }
  }, [currentFeature]);

  useEffect(() => {
    if (!isInView) return; 

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        programmaticScrollRef.current = true;
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval, isInView])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    let closestIndex = 0;
    let minDiff = Infinity;
    
    Array.from(container.children).forEach((child: any, idx) => {
      const center = child.offsetLeft - container.offsetLeft + (child.clientWidth / 2);
      const containerCenter = scrollLeft + (container.clientWidth / 2);
      const diff = Math.abs(center - containerCenter);
      
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== currentFeature) {
      setCurrentFeature(closestIndex);
      setProgress(0);
    }
  };

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden md:overflow-visible", className)}>
      <div className="max-w-[1200px] mx-auto w-full md:px-12">
        {title && (
          <h2 className="text-3xl md:text-5xl font-cormorant font-semibold mb-12 text-center text-dark">
            {title}
          </h2>
        )}

        {/* =========================================
            DESKTOP LAYOUT (Hidden on mobile)
            ========================================= */}
        <div className="hidden md:grid grid-cols-2 gap-24 items-center w-full">
          
          <div className="flex flex-col gap-12 w-full py-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-row items-start gap-8 cursor-pointer p-4 -m-4 rounded-xl transition-colors hover:bg-black/5"
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-transform duration-300",
                    index === currentFeature
                      ? "bg-[#B89A0A] border-[#B89A0A] text-white scale-125 shadow-lg"
                      : "bg-transparent border-border text-mid",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold text-cream">✓</span>
                  ) : (
                    <span className="text-lg font-semibold font-sans">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 mt-1">
                  <h3 className="text-2xl font-semibold font-cormorant text-dark">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-base text-dark font-sans mt-3 leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-md border border-border">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================
            MOBILE LAYOUT (Hidden on desktop)
            ========================================= */}
        <div className="flex md:hidden flex-col w-full relative">
          
          <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-sm border border-border mb-8">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={`mob-img-${index}`}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          {/* 
            Standard full-bleed slider:
            By using calc(100% + 48px) and marginLeft: -24px, we safely break out of the 
            24px mobile padding from the parent .services section without causing 
            horizontal scrollbars on the document (which 100vw does). 
          */}
          <div style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }} className="flex flex-col relative">
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-[24px] no-scrollbar w-full pb-4" 
              id="feature-slider"
              onScroll={handleScroll}
            >
              {features.map((feature, index) => (
                <div
                  key={`mob-text-${index}`}
                  id={`mobile-feature-item-${index}`}
                  className="flex flex-col w-[85%] shrink-0 snap-center gap-5 cursor-pointer pt-2"
                  onClick={() => {
                    programmaticScrollRef.current = true;
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-transform duration-300",
                      index === currentFeature
                        ? "bg-[#B89A0A] border-[#B89A0A] text-white scale-110 shadow-md"
                        : "bg-transparent border-border text-mid",
                    )}
                  >
                    {index <= currentFeature ? (
                      <span className="text-lg font-bold text-cream">✓</span>
                    ) : (
                      <span className="text-lg font-semibold font-sans">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 transition-opacity duration-300" style={{ opacity: index === currentFeature ? 1 : 0.4 }}>
                    <h3 className="text-2xl font-semibold font-cormorant text-dark leading-tight">
                      {feature.title || feature.step}
                    </h3>
                    <p className="text-[16px] text-dark font-sans mt-2 leading-relaxed">
                      {feature.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-2 w-full">
              {features.map((_, index) => (
                <div 
                  key={`dot-${index}`} 
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentFeature ? "w-6 bg-[#B89A0A]" : "w-2 bg-border"
                  )}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
