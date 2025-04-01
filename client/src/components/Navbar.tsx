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
    ingredientMap?: () => void; 
    virtualTour?: () => void;
    dynamicMenu?: () => void;
    originStory?: () => void;
    loyaltyProgram?: () => void;
  };
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const menuItems = [
    { name: 'Welcome', onClick: onNavigate.home },
    { name: 'Story', onClick: onNavigate.about },
    { name: 'Garden', onClick: onNavigate.process },
    { name: 'Team', onClick: onNavigate.team },
    { name: 'Menu', onClick: onNavigate.menu },
    { name: 'Order', onClick: onNavigate.preorder },
    { name: 'Map', onClick: onNavigate.ingredientMap },
    { name: 'Tour', onClick: onNavigate.virtualTour },
    { name: 'Rewards', onClick: onNavigate.loyaltyProgram },
    { name: 'Farms', onClick: onNavigate.originStory },
    { name: 'Green', onClick: onNavigate.dynamicMenu },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-sage-green shadow-md' : 'bg-sage-green bg-opacity-90'}`}> {/* Changed color to sage-green */}
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
          <div className="flex flex-col md:flex-row space-x-4 md:space-x-8 text-primary-dark font-medium"> {/* Changed to flex-col for mobile, flex-row for desktop */}
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                onClick={item.onClick}
                className="hover:text-accent-light transition duration-300 cursor-pointer relative group px-4 py-2 text-sm md:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-neutral-light focus:outline-none">
              {/* Hamburger menu icon */}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className={`bg-sage-green text-neutral-light md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {menuItems.map((item, index) => (
            <a
              key={index}
              onClick={() => handleNavClick(item.onClick)}
              className="py-2 hover:text-accent-light transition duration-300 cursor-pointer text-sm" {/* Added text-sm */}
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;