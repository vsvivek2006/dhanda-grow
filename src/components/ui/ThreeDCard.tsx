"use client";

import React from "react";

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  depth?: number;
}

export function ThreeDCard({
  children,
  className = "",
  glowColor,
  depth,
  ...props
}: ThreeDCardProps) {
  return (
    <div className={`w-full relative ${className}`} {...props}>
      {children}
    </div>
  );
}
