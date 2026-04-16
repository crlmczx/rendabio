import { motion } from 'framer-motion';

interface GradientGlowProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function GradientGlow({ 
  className = '', 
  size = 600, 
  color = '#6d48c3',
  opacity = 0.15 
}: GradientGlowProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        opacity,
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 1.3, opacity],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function GradientGlows() {
  return (
    <>
      <GradientGlow 
        className="top-0 right-0 -translate-y-1/4 translate-x-1/4" 
        size={800} 
        opacity={0.2}
      />
      <GradientGlow 
        className="bottom-0 left-0 translate-y-1/4 -translate-x-1/4" 
        size={600} 
        opacity={0.1}
        color="#4a2d8a"
      />
    </>
  );
}
