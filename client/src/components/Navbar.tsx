import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: {
    home: () => void;
    about: () => void;
    process: () => void;
    team: () => void;
    menu: () => void;
    preorder: () => void;
  };
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (handler: () => void) => {
    handler();
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-md' : 'bg-primary bg-opacity-90'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.span 
              className="text-accent-light font-accent text-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              VivaVeggie
            </motion.span>
          </div>
          <div className="hidden md:flex space-x-8 text-neutral-light font-medium">
            <motion.a
              onClick={() => onNavigate.home()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
            <motion.a
              onClick={() => onNavigate.about()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Story
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
            <motion.a
              onClick={() => onNavigate.process()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Farm-to-Table
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
            <motion.a
              onClick={() => onNavigate.team()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Team
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
            <motion.a
              onClick={() => onNavigate.menu()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Menu
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
            <motion.a
              onClick={() => onNavigate.preorder()} 
              className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Pre-Order
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                layoutId="navUnderline"
              />
            </motion.a>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-neutral-light focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className={`bg-primary-dark text-neutral-light md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a onClick={() => handleNavClick(onNavigate.home)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Home</a>
          <a onClick={() => handleNavClick(onNavigate.about)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Our Story</a>
          <a onClick={() => handleNavClick(onNavigate.process)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Farm-to-Table</a>
          <a onClick={() => handleNavClick(onNavigate.team)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Our Team</a>
          <a onClick={() => handleNavClick(onNavigate.menu)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Menu</a>
          <a onClick={() => handleNavClick(onNavigate.preorder)} className="py-2 hover:text-accent-light transition duration-300 cursor-pointer">Pre-Order</a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
