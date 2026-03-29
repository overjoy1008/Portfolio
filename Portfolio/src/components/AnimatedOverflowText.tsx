"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface AnimatedOverflowTextProps {
  text: string;
  className?: string;
  isActive?: boolean;
}

export const AnimatedOverflowText: React.FC<AnimatedOverflowTextProps> = ({
  text,
  className = "",
  isActive = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [overflowDistance, setOverflowDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !measureRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const textWidth = measureRef.current.scrollWidth;
      setOverflowDistance(Math.max(0, textWidth - containerWidth));
    };

    const frame = window.requestAnimationFrame(measure);

    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (measureRef.current) resizeObserver.observe(measureRef.current);

    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, isActive]);

  const shouldAnimate = overflowDistance > 0;
  const duration = Math.max(6, overflowDistance / 18);

  return (
    <div ref={containerRef} className={`relative overflow-hidden whitespace-nowrap ${className}`} title={text}>
      <span
        ref={measureRef}
        className="absolute invisible pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </span>
      {!isActive || !shouldAnimate ? (
        <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      ) : (
        <motion.span
          className="inline-block whitespace-nowrap"
          animate={{ x: [0, -overflowDistance, -overflowDistance, 0, 0] }}
          transition={{
            duration,
            times: [0, 0.38, 0.5, 0.88, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};
