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
                {/* Number or Check */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-sans transition-colors duration-300 flex-shrink-0 mt-1",
                  isActive 
                    ? "bg-[#B89A0A] text-white" 
                    : "bg-transparent text-mid border border-border group-hover:border-[#B89A0A]"
                )}>
                  {isActive ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
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

        {/* Right Column: Image */}
        <div className="w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-lg border border-border">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentFeature}
              src={features[currentFeature].image}
              alt={features[currentFeature].step}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE VIEW (Hidden on Desktop) */}
      <div className="flex md:hidden flex-col w-full">
        {/* Top Image */}
        <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-sm border border-border mb-16">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentFeature}
              src={features[currentFeature].image}
              alt={features[currentFeature].step}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
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
                  {/* Number or Check */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-sans transition-colors duration-300",
                    isActive 
                      ? "bg-[#B89A0A] text-white shadow-md" 
                      : "bg-transparent text-mid border border-border"
                  )}>
                    {isActive ? (
                      <span className="text-lg font-bold">✓</span>
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
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
