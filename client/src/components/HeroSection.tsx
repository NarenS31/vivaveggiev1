import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onMenuClick: () => void;
  onPreOrderClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onMenuClick, onPreOrderClick }) => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center relative h-screen flex items-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      {/* Background overlay with gradient - darkened for better text readability */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-primary-dark to-primary/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      
      {/* Floating particles/elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent opacity-30"
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 50 + "%", 
                Math.random() * 100 + "%"
              ],
              rotate: Math.random() > 0.5 ? 360 : -360
            }}
            transition={{ 
              duration: Math.random() * 20 + 15, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="font-accent text-6xl md:text-7xl text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.2
              }}
            >
              <motion.span 
                className="inline-block text-stroke-sm"
                whileHover={{ 
                  scale: 1.1,
                  color: "#ffffff", 
                  textShadow: "0 0 12px rgba(255,255,255,0.9)" 
                }}
              >
                Welcome to VivaVeggie
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-white text-xl md:text-2xl mb-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 50,
                delay: 0.4
              }}
            >
              Charlotte's premier farm-to-table vegetarian restaurant
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 40,
              delay: 0.6
            }}
          >
            <motion.button 
              onClick={onMenuClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center justify-center overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
                Explore Our Menu
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine"></span>
            </motion.button>
            
            <motion.button 
              onClick={onPreOrderClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center justify-center overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Pre-Order Now
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine"></span>
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="section-divider absolute bottom-0 left-0 right-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>
    </section>
  );
};

export default HeroSection;
