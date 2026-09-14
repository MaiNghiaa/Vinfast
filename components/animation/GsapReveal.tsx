"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      let fromVars: gsap.TweenVars = {
        opacity: 0,
      };

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
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [animation, delay, duration] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
