"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.8)]"
      style={{ scaleX }}
    />
  );
}
