import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onMenuClick: () => void;
  onPreOrderClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onMenuClick, onPreOrderClick }) => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center relative h-screen flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      <div className="absolute inset-0 bg-primary-dark bg-opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="font-accent text-6xl md:text-7xl text-accent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to VivaVeggie
          </motion.h1>
          
          <motion.p 
            className="text-neutral-light text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Charlotte's premier farm-to-table vegetarian restaurant
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={onMenuClick}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
              </svg>
              Explore Our Menu
            </button>
            
            <button 
              onClick={onPreOrderClick}
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Pre-Order Now
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="section-divider absolute bottom-0 left-0 right-0"></div>
    </section>
  );
};

export default HeroSection;
