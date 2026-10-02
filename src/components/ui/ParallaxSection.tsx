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
 * Buttery Smooth Framer In-View Scroll Entrance:
 * Triggers cleanly when element enters viewport (amount: 0.15) with an elegant
 * 0.65s easeOutQuint transition and gentle 30px lift.
 */
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealOnScrollProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30, x: 0 };
      case "down":
        return { opacity: 0, y: -30, x: 0 };
      case "left":
        return { opacity: 0, x: 25, y: 0 };
      case "right":
        return { opacity: 0, x: -25, y: 0 };
      case "none":
        return { opacity: 0, x: 0, y: 0 };
      default:
        return { opacity: 0, y: 30, x: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialOffset()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1], // Velvety smooth easeOutQuint
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
