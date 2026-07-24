import { useEffect } from "react";

export function useLegacyAnimations() {
  useEffect(() => {
    // ── NAV scroll border ──
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // ── GRID CANVAS ──
    let canvasReqId: number;
    let isVisible = true;
    const canvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let W = 0,
          H = 0,
          dots: any[] = [];
        let cols = 0,
          rows = 0;
        const SPACING = 38;
        const CONNECT_R = 90;
        const MAX_LINKS = 4;

        const buildDots = () => {
          dots = [];
          cols = Math.ceil(W / SPACING) + 2;
          rows = Math.ceil(H / SPACING) + 2;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              dots.push({
                ox: c * SPACING - SPACING * 0.5,
                oy: r * SPACING - SPACING * 0.5,
                amp: 12 + Math.random() * 20,
                goldVal: 0,
              });
            }
          }
        };

        const resize = () => {
          W = canvas.offsetWidth;
          H = canvas.offsetHeight;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = W * dpr;
          canvas.height = H * dpr;
          ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
          ctx.scale(dpr, dpr);
          buildDots();
        };

        const noise = (x: number, y: number, t: number) => {
          return (
            (Math.sin(x * 0.013 + t * 0.6) * Math.cos(y * 0.013 + t * 0.45) +
              Math.sin(x * 0.022 + y * 0.016 + t * 0.35) * 0.5) *
            0.5
          );
        };

        let t = 0;
        const initTime = Date.now();
        const pulses = Array.from({ length: 4 }, () => ({ idx: -1, pause: 0 }));

        const draw = () => {
          canvasReqId = requestAnimationFrame(draw);
          if (!isVisible) return;

          const elapsed = Date.now() - initTime;

          let alphaProgress = 0;
          if (elapsed > 500) {
            alphaProgress = Math.min(1, (elapsed - 500) / 1800);
          }

          const sweepProgress = Math.max(0, Math.min(1, (elapsed - 3500) / 4500));
          const sweepX = (W + CONNECT_R) * sweepProgress;

          if (elapsed > 8000) {
            t += 0.015;
          }

          ctx.clearRect(0, 0, W, H);

          pulses.forEach((p) => {
            if (p.pause > 0) {
              p.pause--;
              return;
            }

            if (p.idx === -1 || Math.random() < 0.005) {
              p.idx = Math.floor(Math.random() * dots.length);
              p.pause = 30 + Math.random() * 60;
            } else {
              const c = p.idx % cols;
              const r = Math.floor(p.idx / cols);
              const neighbors: number[] = [];

              if (c > 0) neighbors.push(p.idx - 1);
              if (c < cols - 1) neighbors.push(p.idx + 1);
              if (r > 0) neighbors.push(p.idx - cols);
              if (r < rows - 1) neighbors.push(p.idx + cols);

              if (c > 0 && r > 0) neighbors.push(p.idx - 1 - cols);
              if (c < cols - 1 && r < rows - 1) neighbors.push(p.idx + 1 + cols);
              if (c > 0 && r < rows - 1) neighbors.push(p.idx - 1 + cols);
              if (c < cols - 1 && r > 0) neighbors.push(p.idx + 1 - cols);

              if (neighbors.length > 0) {
                p.idx = neighbors[Math.floor(Math.random() * neighbors.length)];
                p.pause = 15 + Math.random() * 30;
              }
            }
          });

          const pos = dots.map((d, i) => {
            const nx = noise(d.ox, d.oy, t);
            const ny = noise(d.oy, d.ox, t + 100);

            const isTarget = pulses.some((p) => p.idx === i);
            if (isTarget) {
              d.goldVal = Math.min(1, d.goldVal + 0.15);
            } else {
              d.goldVal = Math.max(0, d.goldVal - 0.015);
            }

            const x = d.ox + nx * d.amp;
            const y = d.oy + ny * d.amp;

            const activeGold = sweepX > x ? d.goldVal : 0;

            return {
              x,
              y,
              dist: Math.sqrt(nx * nx + ny * ny),
              gold: activeGold,
            };
          });

          for (let i = 0; i < pos.length; i++) {
            const a = pos[i];
            let links = 0;
            for (let j = i + 1; j < pos.length && links < MAX_LINKS; j++) {
              const b = pos[j];
              const dx = a.x - b.x,
                dy = a.y - b.y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < CONNECT_R) {
                let leftNode = a.x < b.x ? a : b;
                let rightNode = a.x < b.x ? b : a;
                if (a.x === b.x) {
                  leftNode = a.y < b.y ? a : b;
                  rightNode = a.y < b.y ? b : a;
                }

                let drawLine = false;
                let endX = 0,
                  endY = 0;

                if (sweepX >= rightNode.x) {
                  drawLine = true;
                  endX = rightNode.x;
                  endY = rightNode.y;
                } else if (sweepX > leftNode.x) {
                  drawLine = true;
                  const diffX = rightNode.x - leftNode.x;
                  if (diffX > 0) {
                    const ratio = (sweepX - leftNode.x) / diffX;
                    endX = sweepX;
                    endY = leftNode.y + (rightNode.y - leftNode.y) * ratio;
                  } else {
                    endX = rightNode.x;
                    endY = rightNode.y;
                  }
                }

                if (drawLine) {
                  const s = 1 - d / CONNECT_R;
                  const maxGold = Math.max(a.gold, b.gold);
                  ctx.beginPath();
                  ctx.moveTo(leftNode.x, leftNode.y);
                  ctx.lineTo(endX, endY);

                  if (maxGold > 0.05) {
                    ctx.strokeStyle = `rgba(184,154,10,${s * (0.2 + maxGold * 0.4)})`;
                    ctx.lineWidth = 0.5 + maxGold * 1.2;
                  } else {
                    ctx.strokeStyle = `rgba(26,26,24,${s * 0.2})`;
                    ctx.lineWidth = 0.5;
                  }
                  ctx.stroke();
                  links++;
                }
              }
            }
          }

          pos.forEach((p) => {
            if (alphaProgress === 0) return;

            const baseAlpha = 0.2 + p.dist * 0.5;
            const alpha = baseAlpha * alphaProgress;

            if (p.gold > 0.05) {
              const glowRadius = 4 + p.gold * 14;
              const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
              g.addColorStop(0, `rgba(184,154,10,${p.gold * 0.4})`);
              g.addColorStop(1, "rgba(184,154,10,0)");
              ctx.beginPath();
              ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
              ctx.fillStyle = g;
              ctx.fill();
            }

            ctx.beginPath();
            const radius = 1.3 + p.gold * 2;
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

            if (p.gold > 0.05) {
              ctx.fillStyle = `rgba(184,154,10,${Math.min(alpha + p.gold, 1) * alphaProgress})`;
            } else {
              ctx.fillStyle = `rgba(26,26,24,${alpha})`;
            }
            ctx.fill();
          });
        };

        window.addEventListener("resize", resize);
        resize();
        draw();
      }
    }

    // ── MOBILE MENU ──
    // Handled by React state in App.tsx

    // ── SCROLL ANIMATIONS (Fade, Stagger, Reveal) ──
    const scrollObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );

    document
      .querySelectorAll(".reveal-text, .fade-up-scroll, .stagger-parent, .creative-reveal")
      .forEach((el) => scrollObserver.observe(el));

    // ── PARALLAX ──
    const parallaxElements = document.querySelectorAll(".parallax");
    const handleParallax = () => {
      if (parallaxElements.length === 0) return;
      requestAnimationFrame(() => {
        parallaxElements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = parseFloat(element.getAttribute("data-speed") || "0.15");
          const rect = element.getBoundingClientRect();
          const yPos = rect.top + rect.height / 2 - window.innerHeight / 2;
          element.style.transform = `translateY(${yPos * speed}px)`;
        });
      });
    };
    window.addEventListener("scroll", handleParallax, { passive: true });

    // ── PROCESS LINE ──
    const track = document.getElementById("track");
    if (track) {
      const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
      ];
      const lineWidths = ["0%", "50%", "100%"];
      let triggered = false;

      const activateStep = (i: number) => {
        if (steps[i]) steps[i]!.classList.add("is-active");
        track.style.setProperty("--progress", lineWidths[i]);
      };

      const runSequence = () => {
        if (triggered) return;
        triggered = true;
        setTimeout(() => activateStep(0), 300);
        setTimeout(() => activateStep(1), 1100);
        setTimeout(() => activateStep(2), 1900);
      };

      const processObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) runSequence();
          });
        },
        { threshold: 0.3 }
      );
      processObserver.observe(track);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleParallax);
      if (canvasReqId) cancelAnimationFrame(canvasReqId);
    };
  }, []);
}
