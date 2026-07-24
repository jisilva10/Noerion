import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChipEye } from "../ui/ChipEye"
import { ServiceAnimation } from "./ServiceAnimations"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  autoPlayInterval?: number
}

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 8000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3 })
  const programmaticScrollRef = useRef(false);

  // Auto-play timer
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

  // Sync mobile scroll when auto-playing or clicking
  useEffect(() => {
    if (programmaticScrollRef.current && window.innerWidth < 768) {
      const el = document.getElementById(`mobile-item-${currentFeature}`);
      const slider = document.getElementById('mobile-slider');
      if (el && slider) {
        const scrollLeft = el.offsetLeft - slider.offsetLeft - (slider.clientWidth / 2) + (el.clientWidth / 2);
        slider.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
      programmaticScrollRef.current = false;
    }
  }, [currentFeature]);

  // Handle manual swipe on mobile
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
      setProgress(0); // reset timer on manual swipe
    }
  };

  return (
    <div ref={containerRef} className={cn("w-full max-w-[1400px] mx-auto", className)}>
      
      {/* DESKTOP VIEW (Hidden on Mobile) */}
      <div className="hidden md:flex flex-row gap-32 items-center w-full">
        {/* Left Column: Text */}
        <div className="w-1/2 flex flex-col gap-10">
          {features.map((feature, index) => {
            const isActive = index === currentFeature;
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
                className="flex flex-row items-start gap-6 cursor-pointer group"
              >
                {/* Chip Placeholder / Inactive Chip */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 relative">
                  {!isActive ? (
                    <motion.div 
                      layoutId={`chip-desktop-${index}`}
                      className="absolute inset-0 flex items-center justify-center"
                      transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.3 } }}
                    >
                      <ChipEye forceAsleep width="48px" height="48px" />
                    </motion.div>
                  ) : null}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className={cn(
                    "text-2xl font-semibold font-cormorant transition-colors duration-300",
                    isActive ? "text-dark" : "text-mid group-hover:text-dark/80"
                  )}>
                    {feature.title || feature.step}
                  </h3>
                  <p className={cn(
                    "text-base font-sans mt-3 leading-relaxed transition-colors duration-300",
                    isActive ? "text-dark" : "text-mid/70"
                  )}>
                    {feature.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Animation */}
        <div className="w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-lg border border-border bg-transparent flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`animation-${currentFeature}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <ServiceAnimation index={currentFeature} />
            </motion.div>
          </AnimatePresence>

          <motion.div 
            key={`chip-desktop-active-${currentFeature}`}
            layoutId={`chip-desktop-${currentFeature}`}
            className="z-10 relative flex items-center justify-center"
            style={{ width: 120, height: 120 }}
            transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.3 } }}
          >
            <motion.div
              initial={{ rotate: -180, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
               <ChipEye width="120px" height="120px" wakeDelay={800} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE VIEW (Hidden on Desktop) */}
      <div className="flex md:hidden flex-col w-full gap-10">
        {/* Top Animation */}
        <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-sm border border-border bg-transparent flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`animation-${currentFeature}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <ServiceAnimation index={currentFeature} />
            </motion.div>
          </AnimatePresence>

          <motion.div 
            key={`chip-mobile-active-${currentFeature}`}
            layoutId={`chip-mobile-${currentFeature}`}
            className="z-10 relative flex items-center justify-center"
            style={{ width: 100, height: 100 }}
            transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.3 } }}
          >
            <motion.div
              initial={{ rotate: -180, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
               <ChipEye width="100px" height="100px" wakeDelay={800} />
            </motion.div>
          </motion.div>
        </div>

        {/* Horizontal Slider 
            Using standard Tailwind layout. We do not use negative margins to break out,
            we just let it sit inside its natural container to avoid ANY right-side cutoff issues.
        */}
        <div className="w-full flex flex-col">
          <div 
            id="mobile-slider"
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar w-full pb-4 px-2"
            onScroll={handleScroll}
          >
            {features.map((feature, index) => {
              const isActive = index === currentFeature;
              return (
                <div
                  key={index}
                  id={`mobile-item-${index}`}
                  onClick={() => {
                    programmaticScrollRef.current = true;
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                  className="flex flex-col w-[85%] shrink-0 snap-center cursor-pointer gap-4"
                >
                  {/* Chip Placeholder / Inactive Chip */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    {!isActive ? (
                      <motion.div 
                        layoutId={`chip-mobile-${index}`}
                        className="absolute inset-0 flex items-center justify-center"
                        transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.3 } }}
                      >
                        <ChipEye forceAsleep width="48px" height="48px" />
                      </motion.div>
                    ) : null}
                  </div>

                  {/* Text Content */}
                  <div className={cn(
                    "flex-1 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-40"
                  )}>
                    <h3 className="text-xl font-semibold font-cormorant text-dark">
                      {feature.title || feature.step}
                    </h3>
                    <p className="text-[15px] font-sans mt-2 text-dark leading-relaxed">
                      {feature.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* IG-style Dots */}
          <div className="flex justify-center items-center gap-2 mt-4 w-full">
            {features.map((_, index) => (
              <div 
                key={index} 
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
  )
}
