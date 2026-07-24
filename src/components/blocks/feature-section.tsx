import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChipEye } from "../ui/ChipEye"
import { ServiceAnimation } from "./ServiceAnimations"
import { Search } from "lucide-react";

const CharacterChip = ({ currentFeature, isMobile }: { currentFeature: number, isMobile: boolean }) => {
  const chipId = isMobile ? `chip-mobile-${currentFeature}` : `chip-desktop-${currentFeature}`;
  const chipSize = isMobile ? 100 : 120;

  // We define the character's movement based on the scenario.
  // We use key={currentFeature} on the inner motion.div so the animation restarts perfectly every time.
  
  let animationProps = {};
  let extraElements = null;

  if (currentFeature === 0) {
    // Scenario 1: Automation. Rolls along the floor, looking up at the pipeline.
    animationProps = {
      x: [0, -120, 120, 0],
      y: [120, 120, 120, 120], // Floor level
      rotate: [0, -15, 15, 0]
    };
  } else if (currentFeature === 1) {
    // Scenario 2: AI Ecosystem. Floats in the bottom left, emitting pulses to the neural network.
    animationProps = {
      x: [0, -150, -150, 0],
      y: [0, 100, 100, 0], // Bottom left
      scale: [1, 0.8, 0.8, 1]
    };
    extraElements = (
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-[#B89A0A]"
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
      />
    );
  } else if (currentFeature === 2) {
    // Scenario 3: Consulting. Holds a magnifying glass, scanning the blueprint above.
    animationProps = {
      x: [0, -140, 140, 0],
      y: [100, 100, 100, 100], // Floor level
      rotate: [0, -10, 10, 0]
    };
    extraElements = (
      <motion.div
        className="absolute -right-4 -top-2 text-[#B89A0A] bg-white rounded-full p-2 shadow-lg border border-border"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", bounce: 0.5 }}
      >
        <Search size={24} strokeWidth={3} />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`chip-active-wrapper-${isMobile ? 'm' : 'd'}-${currentFeature}`} // Force remount for layoutId to trigger instantly
      layoutId={chipId}
      className="absolute left-1/2 top-1/2 z-50 flex items-center justify-center pointer-events-none"
      style={{ 
        width: chipSize, height: chipSize, 
        marginLeft: -chipSize / 2, marginTop: -chipSize / 2 
      }}
      transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
    >
      <motion.div
        key={`character-anim-${currentFeature}`}
        animate={animationProps}
        transition={{ delay: 1.5, duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {extraElements}
        <ChipEye width={`${chipSize}px`} height={`${chipSize}px`} disableMouseFollow={true} wakeDelay={1500} />
      </motion.div>
    </motion.div>
  );
};

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
    <LayoutGroup>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ChipEye forceAsleep width="48px" height="48px" />
                      </div>
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
                <ServiceAnimation index={currentFeature} isMobile={false} />
              </motion.div>
            </AnimatePresence>

            {/* Render active chip OUTSIDE AnimatePresence so it mounts instantly! */}
            <CharacterChip currentFeature={currentFeature} isMobile={false} />
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
                <ServiceAnimation index={currentFeature} isMobile={true} />
              </motion.div>
            </AnimatePresence>
            <CharacterChip currentFeature={currentFeature} isMobile={true} />
          </div>

          {/* Horizontal Slider */}
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
                          transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
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
    </LayoutGroup>
  )
}
