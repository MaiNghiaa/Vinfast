"use client";

import React, { useRef, useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    countObj.current.val = 0;

    void import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled || !el) return;

      ctx = gsap.context(() => {
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
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [value, duration, prefix, suffix, decimals]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
