import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: "seedling",
      title: "Sustainability",
      description: "We're committed to sustainable practices that respect our planet and its resources."
    },
    {
      icon: "carrot",
      title: "Local Sourcing",
      description: "We partner with local farms to ensure the freshest ingredients while supporting our community."
    },
    {
      icon: "heart",
      title: "Compassion",
      description: "We believe in kind food that's good for people, animals, and our planet."
    },
    {
      icon: "utensils",
      title: "Culinary Creativity",
      description: "We reimagine vegetarian cuisine with bold flavors and innovative techniques."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">From humble beginnings to Charlotte's favorite vegetarian destination</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl text-primary-dark mb-4">Rooted in Charlotte</h3>
            <p className="text-neutral-dark mb-4">
              VivaVeggie began in 2015 when three friends with a passion for plant-based cooking decided to transform Charlotte's dining scene.
            </p>
            <p className="text-neutral-dark mb-4">
              Starting as a small weekend farmer's market stall, we quickly grew a devoted following for our creative vegetarian dishes made with locally-sourced ingredients.
            </p>
            <p className="text-neutral-dark mb-6">
              Two years later, we opened our first brick-and-mortar location in the heart of Charlotte. Today, we're proud to offer a full dining experience that celebrates the bounty of local farms while proving that vegetarian cuisine can be both nutritious and delicious.
            </p>
            <div className="flex items-center">
              <div className="w-16 h-1 bg-secondary mr-4"></div>
              <p className="font-accent text-secondary-dark text-2xl">Eat plants, love life</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="VivaVeggie restaurant interior with customers" 
              className="rounded-lg shadow-xl w-full h-auto" 
            />
          </motion.div>
        </div>
        
        {/* Values */}
        <div className="mt-20">
          <motion.h3 
            className="font-heading text-3xl text-primary-dark text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center h-[300px] flex flex-col justify-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    {value.icon === "seedling" && (
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    )}
                    {value.icon === "carrot" && (
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    )}
                    {value.icon === "heart" && (
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    )}
                    {value.icon === "utensils" && (
                      <path d="M3 1a1 1 0 011 1v4a1 1 0 01-1 1H1a1 1 0 010-2h1V3a1 1 0 011-1zm12 12a1 1 0 01-1 1H1a1 1 0 010-2h13a1 1 0 011 1zM9.6 7.5a1 1 0 01-1 1H1a1 1 0 010-2h7.6a1 1 0 011 1z" />
                    )}
                  </svg>
                </div>
                <h4 className="font-heading text-xl mb-2">{value.title}</h4>
                <p className="text-neutral-dark text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
