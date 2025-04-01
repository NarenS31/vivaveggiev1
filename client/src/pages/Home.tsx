import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProcessSection from "../components/ProcessSection";
import TeamSection from "../components/TeamSection";
import MenuSection from "../components/MenuSection";
import OrderForm from "../components/OrderForm";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
import IngredientMap from "../components/IngredientMap";

const Home: React.FC = () => {
  // References for scroll navigation
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const preorderRef = useRef<HTMLDivElement>(null);
  const ingredientMapRef = useRef<HTMLDivElement>(null);

  // Active tab state for menu navigation
  const [activeTab, setActiveTab] = useState("menu");
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Enhanced menu navigation that first scrolls to menu section, then switches tab
  const handleMenuClick = () => {
    scrollToSection(menuRef);
    setActiveTab("menu");
  };
  
  // Handler for ingredient map navigation
  const handleIngredientMapClick = () => {
    scrollToSection(ingredientMapRef);
  };

  return (
    <div className="font-body bg-pattern min-h-screen">
      <Navbar 
        onNavigate={{
          home: () => scrollToSection(homeRef),
          about: () => scrollToSection(aboutRef),
          process: () => scrollToSection(processRef),
          team: () => scrollToSection(teamRef),
          menu: handleMenuClick,
          preorder: () => scrollToSection(preorderRef),
          ingredientMap: handleIngredientMapClick,
        }} 
      />
      
      <main>
        <motion.div 
          ref={homeRef} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection 
            onMenuClick={handleMenuClick}
            onPreOrderClick={() => scrollToSection(preorderRef)}
          />
        </motion.div>
        
        <motion.div 
          ref={aboutRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AboutSection />
        </motion.div>
        
        <motion.div 
          ref={processRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProcessSection />
        </motion.div>
        
        <motion.div 
          ref={teamRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TeamSection />
        </motion.div>
        
        <motion.div 
          ref={menuRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MenuSection />
        </motion.div>
        
        <motion.div 
          ref={preorderRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <OrderForm />
        </motion.div>
        
        <motion.div
          ref={ingredientMapRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <IngredientMap />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialsSection />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
