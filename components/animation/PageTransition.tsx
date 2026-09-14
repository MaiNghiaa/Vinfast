"use client";

import React, { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const transitionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = transitionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Silky smooth entrance transition on route change
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={transitionRef} className="w-full">
      {children}
    </div>
  );
}
