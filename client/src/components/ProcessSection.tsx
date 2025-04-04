import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { processSteps, impactStats } from '../data/process';

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="process" className="py-16 md:py-24 bg-primary bg-opacity-5 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Farm-to-Table Journey</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">Discover how we bring the freshest sustainable ingredients from local farms to your plate</p>
        </motion.div>

        {/* Interactive Roadmap - Modified for condensed layout */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8"> {/* Simplified grid for better mobile responsiveness */}
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-12">
                  <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-grow space-y-3">
                  <h3 className="text-xl font-heading text-primary-dark">{step.title}</h3>
                  <p className="text-neutral-dark text-sm">{step.description}</p>
                </div>
                <div className="flex-shrink-0 w-1/3"> {/* Reduced image width */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300'; // Placeholder image
                      e.currentTarget.alt = 'Placeholder Image';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Environmental Impact Stats -  Added scroll functionality (requires additional styling) */}
        <div className="mt-20 overflow-y-auto max-h-[300px]"> {/* Added scroll for long content */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h3 
              className="font-heading text-2xl text-primary-dark text-center mb-8"
              variants={fadeInUp}
            >
              Our Environmental Impact
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {impactStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      {stat.icon === "truck" && (
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      )}
                      {stat.icon === "recycle" && (
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      )}
                      {stat.icon === "hands-helping" && (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                      )}
                      {stat.icon === "tint" && (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      )}
                    </svg>
                  </div>
                  <motion.p 
                    className="text-4xl font-bold text-primary-dark"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-neutral-dark">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;