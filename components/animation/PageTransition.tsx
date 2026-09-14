"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const transitionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = transitionRef.current;
      if (!el) return;

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
    },
    { scope: transitionRef, dependencies: [pathname] }
  );

  return (
    <div ref={transitionRef} className="w-full">
      {children}
    </div>
  );
}
