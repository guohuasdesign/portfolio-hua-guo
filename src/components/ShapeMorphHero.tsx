import { useEffect, useState } from "react";
import { interpolate } from "flubber";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { colors, shapes } from "./ShapeMorphHero.data";

export function ShapeMorphHero({
  onShapeChange,
}: {
  onShapeChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);

  const progress = useMotionValue(0);

  // Make sure mapping lengths match
  const color = useTransform(
    progress,
    shapes.map((_, i) => i),
    colors
  );
  const dPath = useFlubber(progress, shapes);

  /* 🔁 Morph animation loop */
  useEffect(() => {
    const nextIndex = index + 1 >= shapes.length ? 0 : index + 1;

    const animation = animate(progress, nextIndex, {
      duration: 1,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => {
        if (nextIndex === 0) {
          progress.set(0);
        }
        setIndex(nextIndex);
        onShapeChange?.(nextIndex);
      },
    });

    return () => animation.stop();
  }, [index, onShapeChange, progress]);

  return (
    <svg
      viewBox="0 0 24 24"
      className="
      w-full h-full
      max-w-[260px] max-h-[260px]
      sm:max-w-[300px] sm:max-h-[300px]
      md:max-w-[340px] md:max-h-[340px]
      drop-shadow-[0_18px_45px_rgba(0,0,0,0.25)]
    "
    >
      <defs>
        <linearGradient id="morph-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      <g transform="translate(1 1) scale(0.92)">
        <motion.path
          d={dPath}
          fill="url(#morph-fill)"
          style={{ fill: color }}
          className="transition-filter duration-500"
        />
      </g>
    </svg>
  );
}

/* ---------------- utils ---------------- */

function useFlubber(progress: MotionValue<number>, items: string[]) {
  return useTransform(
    progress,
    items.map((_, i) => i),
    items,
    {
      mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.2 }),
    }
  );
}

