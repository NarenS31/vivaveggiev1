import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoSvg from '../assets/logo.svg';

interface NavbarProps {
  onNavigate: {
    home: () => void;
    about: () => void;
    process: () => void;
    team: () => void;
    menu: () => void;
    preorder: () => void;
    ingredientMap?: () => void; // Optional to maintain compatibility
    virtualTour?: () => void;
    dynamicMenu?: () => void;
    originStory?: () => void;
    loyaltyProgram?: () => void;
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
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => onNavigate.home()}
              style={{ cursor: 'pointer' }}
            >
              <img src={logoSvg} alt="VivaVeggie Logo" className="h-12 mr-2" />
            </motion.div>
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
            {onNavigate.ingredientMap && (
              <motion.a
                onClick={() => onNavigate.ingredientMap && onNavigate.ingredientMap()} 
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Ingredient Map
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            )}
            {onNavigate.virtualTour && (
              <motion.a
                onClick={() => onNavigate.virtualTour && onNavigate.virtualTour()} 
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            )}
            {onNavigate.dynamicMenu && (
              <motion.a
                onClick={() => onNavigate.dynamicMenu && onNavigate.dynamicMenu()} 
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Seasonal Menu
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            )}
            {onNavigate.originStory && (
              <motion.a
                onClick={() => onNavigate.originStory && onNavigate.originStory()} 
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Origin Story
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            )}
            {onNavigate.loyaltyProgram && (
              <motion.a
                onClick={() => onNavigate.loyaltyProgram && onNavigate.loyaltyProgram()} 
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Rewards
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            )}
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
          {onNavigate.ingredientMap && (
            <a 
              onClick={() => onNavigate.ingredientMap && handleNavClick(onNavigate.ingredientMap)} 
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer"
            >
              Ingredient Map
            </a>
          )}
          {onNavigate.virtualTour && (
            <a 
              onClick={() => onNavigate.virtualTour && handleNavClick(onNavigate.virtualTour)} 
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer"
            >
              Virtual Tour
            </a>
          )}
          {onNavigate.dynamicMenu && (
            <a 
              onClick={() => onNavigate.dynamicMenu && handleNavClick(onNavigate.dynamicMenu)} 
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer"
            >
              Seasonal Menu
            </a>
          )}
          {onNavigate.originStory && (
            <a 
              onClick={() => onNavigate.originStory && handleNavClick(onNavigate.originStory)} 
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer"
            >
              Origin Story
            </a>
          )}
          {onNavigate.loyaltyProgram && (
            <a 
              onClick={() => onNavigate.loyaltyProgram && handleNavClick(onNavigate.loyaltyProgram)} 
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer"
            >
              Loyalty Program
            </a>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
