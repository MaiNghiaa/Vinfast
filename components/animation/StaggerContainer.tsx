"use client";

import React, { useRef, useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    const play = () => {
      if (cancelled || !container) return;

      void import("@/lib/gsap").then(({ gsap }) => {
        if (cancelled || !container) return;

        const items =
          itemSelector === "> *"
            ? container.children
            : container.querySelectorAll(itemSelector);
        if (!items || items.length === 0) return;

        ctx = gsap.context(() => {
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
              force3D: true,
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      play();
      return () => {
        cancelled = true;
        ctx?.revert();
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
    io.observe(container);

    return () => {
      cancelled = true;
      io.disconnect();
      ctx?.revert();
    };
  }, [stagger, duration, yOffset, delay, itemSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
