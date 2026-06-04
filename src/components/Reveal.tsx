import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'zoom';

const variants = (d: Direction): Variants => {
  const distance = 40;
  const init: Record<Direction, any> = {
    up: { opacity: 0, y: distance },
    left: { opacity: 0, x: -distance },
    right: { opacity: 0, x: distance },
    zoom: { opacity: 0, scale: 0.92 },
  };
  return {
    hidden: init[d],
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      variants={variants(direction)}
    >
      {children}
    </motion.div>
  );
}