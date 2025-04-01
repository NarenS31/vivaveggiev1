import React from 'react';
import { motion } from 'framer-motion';
import { chefs, farmers } from '../data/team';

const TeamSection: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">The passionate people behind our farm-to-table mission</p>
        </motion.div>

        {/* Chefs */}
        <div className="mb-20">
          <motion.h3 
            className="font-heading text-3xl text-primary-dark text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Our Chefs
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {chefs.map((chef, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-64 object-cover object-center" 
                />
                <div className="p-6">
                  <h4 className="font-heading text-xl text-primary-dark mb-2">{chef.name}</h4>
                  <p className="text-secondary font-medium mb-3">{chef.title}</p>
                  <p className="text-neutral-dark text-sm mb-4">{chef.bio}</p>
                  <p className="font-accent text-primary-light text-lg">"{chef.quote}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Farmers */}
        <div>
          <motion.h3 
            className="font-heading text-3xl text-primary-dark text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Our Farmers
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {farmers.map((farmer, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={farmer.image} 
                  alt={farmer.name} 
                  className="w-full h-64 object-cover object-center" 
                />
                <div className="p-6">
                  <h4 className="font-heading text-xl text-primary-dark mb-2">{farmer.name}</h4>
                  <p className="text-secondary font-medium mb-3">{farmer.farm}</p>
                  <p className="text-neutral-dark text-sm mb-4">{farmer.description}</p>
                  <div className="flex items-center text-sm text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                    <span>{farmer.supplies}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
