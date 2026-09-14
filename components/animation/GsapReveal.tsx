"use client";

import React, { useRef, useLayoutEffect } from "react";

interface GsapRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  duration?: number;
  delay?: number;
  yOffset?: number;
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function GsapReveal({
  children,
  animation = "fade-up",
  duration = 0.8,
  delay = 0,
  yOffset = 30,
  className = "",
  triggerOnce = true,
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    let failSafe: number | undefined;

    const play = () => {
      if (cancelled || !el) return;
      el.style.opacity = "0";

      failSafe = window.setTimeout(() => {
        if (!cancelled && el.style.opacity === "0") el.style.opacity = "";
      }, 2500);

      void import("@/lib/gsap").then(({ gsap }) => {
        if (cancelled || !el) return;
        if (failSafe) window.clearTimeout(failSafe);

        let fromVars: gsap.TweenVars = { opacity: 0 };

        switch (animation) {
          case "fade-up":
            fromVars = { opacity: 0, y: yOffset };
            break;
          case "scale-up":
            fromVars = { opacity: 0, scale: 0.95, y: yOffset / 2 };
            break;
          case "slide-left":
            fromVars = { opacity: 0, x: -yOffset };
            break;
          case "slide-right":
            fromVars = { opacity: 0, x: yOffset };
            break;
          case "fade-in":
          default:
            fromVars = { opacity: 0 };
            break;
        }

        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            fromVars,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration,
              delay,
              ease: "power3.out",
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: triggerOnce
                  ? "play none none none"
                  : "play reverse play reverse",
              },
            }
          );
        });
      });
    };

    // Defer GSAP download until section is near viewport
    if (typeof IntersectionObserver === "undefined") {
      play();
      return () => {
        cancelled = true;
        if (failSafe) window.clearTimeout(failSafe);
        ctx?.revert();
        el.style.opacity = "";
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { rootMargin: "25% 0px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (failSafe) window.clearTimeout(failSafe);
      ctx?.revert();
      el.style.opacity = "";
    };
  }, [animation, delay, duration, yOffset, triggerOnce]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
