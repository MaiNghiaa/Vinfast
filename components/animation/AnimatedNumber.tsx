"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function AnimatedNumber({
  value,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: AnimatedNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const countObj = useRef({ val: 0 });

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el) return;

      countObj.current.val = 0;

      gsap.to(countObj.current, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (el) {
            const formatted =
              decimals > 0
                ? countObj.current.val.toFixed(decimals)
                : Math.round(countObj.current.val).toLocaleString("vi-VN");
            el.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    },
    { scope: spanRef, dependencies: [value, duration] }
  );

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
