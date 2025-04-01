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
import VirtualTour from "../components/VirtualTour";
import DynamicMenu from "../components/DynamicMenu";
import OriginStory from "../components/OriginStory";
import { LoyaltyProgramCard } from "../components/GameElements";

const Home: React.FC = () => {
  // References for scroll navigation
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const preorderRef = useRef<HTMLDivElement>(null);
  const ingredientMapRef = useRef<HTMLDivElement>(null);
  const virtualTourRef = useRef<HTMLDivElement>(null);
  const dynamicMenuRef = useRef<HTMLDivElement>(null);
  const originStoryRef = useRef<HTMLDivElement>(null);
  const loyaltyProgramRef = useRef<HTMLDivElement>(null);

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
  
  // Handlers for new features navigation
  const handleVirtualTourClick = () => {
    scrollToSection(virtualTourRef);
  };
  
  const handleDynamicMenuClick = () => {
    scrollToSection(dynamicMenuRef);
  };
  
  const handleOriginStoryClick = () => {
    scrollToSection(originStoryRef);
  };
  
  const handleLoyaltyProgramClick = () => {
    scrollToSection(loyaltyProgramRef);
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
          virtualTour: handleVirtualTourClick,
          dynamicMenu: handleDynamicMenuClick,
          originStory: handleOriginStoryClick,
          loyaltyProgram: handleLoyaltyProgramClick,
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

        <motion.div
          ref={virtualTourRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <VirtualTour />
        </motion.div>

        <motion.div
          ref={dynamicMenuRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <DynamicMenu />
        </motion.div>
        
        <motion.div
          ref={originStoryRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <OriginStory />
        </motion.div>
        
        <motion.div
          ref={loyaltyProgramRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-16 md:py-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Sustainability Rewards</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-neutral-dark max-w-2xl mx-auto">
              Join our loyalty program and earn rewards while supporting sustainable dining practices
            </p>
          </div>
          <LoyaltyProgramCard />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
