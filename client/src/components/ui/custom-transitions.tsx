import React from 'react';
import { motion } from 'framer-motion';

// Fade up transition
export const FadeUp = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Fade in transition
export const FadeIn = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale up transition
export const ScaleUp = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from left
export const SlideInLeft = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from right
export const SlideInRight = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number, [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Stagger children animations
export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, ...props }: { 
  children: React.ReactNode, 
  delayChildren?: number, 
  staggerChildren?: number, 
  [key: string]: any 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren,
          staggerChildren
        }
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Child item for stagger animation
export const StaggerItem = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    {...props}
  >
    {children}
  </motion.div>
);
