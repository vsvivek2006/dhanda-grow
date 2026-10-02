"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Ultra-subtle Framer.com style entrance:
 * Clean, instant vertical fade-up (14px) with zero lag and no aggressive horizontal swings.
 */
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(delay, 0.08),
        ease: [0.16, 1, 0.3, 1], // Crisp Framer cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
