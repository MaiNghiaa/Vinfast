"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface StaggerContainerProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  delay?: number;
  className?: string;
  itemSelector?: string;
}

export default function StaggerContainer({
  children,
  stagger = 0.12,
  duration = 0.7,
  yOffset = 30,
  delay = 0,
  className = "",
  itemSelector = "> *",
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll(itemSelector);
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [stagger, duration, yOffset] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
