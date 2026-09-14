"use client";

import React from "react";
import { usePathname } from "next/navigation";

/** CSS-only route enter — keeps GSAP off the critical path */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="w-full animate-page-enter">
      {children}
    </div>
  );
}
