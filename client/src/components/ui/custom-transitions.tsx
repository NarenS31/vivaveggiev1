import React from 'react';
import { motion } from 'framer-motion';

// Fade up transition with improved easing
export const FadeUp = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.7, 
      delay, 
      ease: [0.25, 0.1, 0.25, 1.0] // improved easing curve
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Fade in transition with longer duration
export const FadeIn = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.8, 
      delay,
      ease: "easeOut"
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale up transition with spring bounce
export const ScaleUp = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring", 
      stiffness: 200, 
      damping: 15, 
      delay 
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from left with spring physics
export const SlideInLeft = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, x: -70 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from right with spring physics
export const SlideInRight = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, x: 70 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Stagger children animations with improved timing
export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.15, ...props }: { 
  children: React.ReactNode, 
  delayChildren?: number, 
  staggerChildren?: number, 
  [key: string]: any 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren,
          staggerChildren,
          ease: "easeOut"
        }
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Child item for stagger animation with spring bounce
export const StaggerItem = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          type: "spring",
          stiffness: 120,
          damping: 14,
          mass: 1
        } 
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);
