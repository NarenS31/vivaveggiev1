import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  achievements?: string[];
}

const timeline: TimelineEvent[] = [
  {
    year: '2015',
    title: 'The Seed of an Idea',
    description: 'Founders Maria Chen and David Rodriguez, frustrated by the lack of truly sustainable dining options in Charlotte, began dreaming of a restaurant that could showcase the bounty of local farms while minimizing environmental impact.',
    achievements: ['Completed culinary training focusing on plant-based cuisine', 'Worked with 5 local farms to understand sustainable growing practices']
  },
  {
    year: '2016',
    title: 'From Farm to Community',
    description: 'The founding team spent a year working directly with Charlotte-area farmers, learning their growing methods and challenges, while developing relationships that would become the backbone of VivaVeggie\'s supply chain.',
    achievements: ['Established partnerships with 12 family farms within 50 miles of Charlotte', 'Created first prototype seasonal menu']
  },
  {
    year: '2017',
    title: 'Growing Our Vision',
    description: 'With a clearer vision and strong farmer relationships, we began hosting pop-up dinners throughout Charlotte to introduce our farm-to-table concept and gather feedback from the community.',
    achievements: ['Hosted 24 successful pop-up events', 'Served over 1,200 guests', 'Refined our menu based on guest feedback']
  },
  {
    year: '2018',
    title: 'Finding Our Roots',
    description: 'After a successful series of pop-ups, we found our permanent home in Charlotte\'s NoDa district. We chose this location for its walkability, community focus, and the ability to create our own garden space.',
    achievements: ['Secured our current location', 'Began renovations using reclaimed and sustainable materials', 'Planted our first on-site garden']
  },
  {
    year: '2019',
    title: 'Opening Our Doors',
    description: 'VivaVeggie officially opened to the public in spring 2019, featuring a seasonal menu highlighting ingredients from our partner farms and our own garden. Our zero-waste philosophy was implemented from day one.',
    achievements: ['Grand opening in April 2019', 'First full seasonal menu launched', 'Zero-waste operations from opening day']
  },
  {
    year: '2020',
    title: 'Weathering the Storm',
    description: 'During the global pandemic, we pivoted to offering meal kits and farm boxes, helping keep our partner farmers in business while continuing to serve our community with nutritious, sustainable food.',
    achievements: ['Launched farm-to-door delivery service', 'Provided over 5,000 meals to frontline workers', 'Maintained 100% of farm partnerships despite challenges']
  },
  {
    year: '2021',
    title: 'Growing Together',
    description: 'As we reopened our dining room, we expanded our on-site garden and launched our sustainability education program, offering workshops on seasonal cooking, composting, and urban gardening.',
    achievements: ['Expanded garden space by 200%', 'Launched monthly sustainability workshops', 'Achieved carbon-neutral operations']
  },
  {
    year: '2022',
    title: 'Nurturing Innovation',
    description: 'We introduced our augmented reality menu experience and ingredient tracking system, allowing guests to see the exact source of each component of their meal and learn about sustainable farming practices.',
    achievements: ['Developed proprietary food tracking system', 'Implemented AR menu technology', 'Reduced food waste by an additional 15%']
  },
  {
    year: '2023',
    title: 'Harvesting Recognition',
    description: 'VivaVeggie received national recognition for our sustainability practices, including awards for our zero-waste kitchen, innovative technology integration, and community impact.',
    achievements: ['Named "Most Sustainable Restaurant" by Green Dining Guide', 'Featured in National Geographic\'s "Future of Food" series', 'Achieved 100% renewable energy use']
  },
  {
    year: '2024',
    title: 'Planting New Seeds',
    description: 'Today, we\'re expanding our impact through our newly launched seed-saving program, farmer mentorship initiative, and cooking academy, all aimed at spreading sustainable food practices throughout our community.',
    achievements: ['Launched seed library with 50+ heritage varieties', 'Began farmer mentorship program', 'Opened VivaVeggie Cooking Academy']
  }
];

const OriginStory: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeYearIndex, setActiveYearIndex] = useState<number>(timeline.length - 1);

  const handleYearClick = (index: number) => {
    setActiveYearIndex(index);
  };

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  return (
    <section id="origin-story" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Origin Story</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">
            Discover how VivaVeggie grew from a simple idea to Charlotte's premier sustainable dining experience, committed to local farming and ethical food practices
          </p>
        </motion.div>

        {/* Timeline Year Navigation */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex justify-between min-w-max md:min-w-0 border-b border-neutral-200 pb-2">
            {timeline.map((event, index) => (
              <motion.button
                key={event.year}
                className={`px-4 py-2 rounded-t-lg text-sm md:text-base font-medium relative ${
                  index === activeYearIndex 
                    ? 'text-primary' 
                    : 'text-neutral-dark hover:text-primary-dark'
                }`}
                onClick={() => handleYearClick(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {event.year}
                {index === activeYearIndex && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" 
                    layoutId="activeYear"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYearIndex}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-primary text-3xl font-heading font-bold mb-2">
                  {timeline[activeYearIndex].year}
                </div>
                <h3 className="text-primary-dark text-xl font-bold mb-4">
                  {timeline[activeYearIndex].title}
                </h3>
                <p className="text-neutral-dark mb-6">
                  {timeline[activeYearIndex].description}
                </p>
                
                {timeline[activeYearIndex].achievements && (
                  <div>
                    <h4 className="text-primary-dark font-medium mb-2">Key Milestones:</h4>
                    <ul className="space-y-1">
                      {timeline[activeYearIndex].achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-accent mr-2">✓</span>
                          <span className="text-neutral-dark text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <motion.button
                  className="mt-6 px-4 py-2 bg-primary text-white rounded-lg inline-flex items-center hover:bg-primary-dark"
                  onClick={() => handleEventClick(timeline[activeYearIndex])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Story
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Visual Timeline */}
          <div className="relative lg:col-span-3 h-[500px] hidden lg:block">
            <div className="absolute left-0 top-10 bottom-10 w-1 bg-primary-light"></div>
            
            {timeline.map((event, index) => {
              // Calculate position along timeline based on index
              const topPercentage = (index / (timeline.length - 1)) * 80 + 10;
              
              return (
                <motion.div
                  key={event.year}
                  className="absolute flex items-center"
                  style={{ top: `${topPercentage}%`, left: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: index === activeYearIndex ? 1.05 : 1,
                    x: index === activeYearIndex ? 12 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className={`w-4 h-4 rounded-full ml-[-8px] ${
                      index === activeYearIndex 
                        ? 'bg-primary' 
                        : 'bg-primary-light'
                    }`}
                  ></div>
                  
                  <div 
                    className={`ml-6 transform transition-all duration-300 ${
                      index === activeYearIndex 
                        ? 'scale-100 opacity-100' 
                        : 'scale-95 opacity-70'
                    }`}
                  >
                    <div className="text-sm text-primary font-medium mb-1">{event.year}</div>
                    <div className="text-primary-dark font-medium">{event.title}</div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Timeline Image - Randomized for visual interest */}
            <div className="absolute right-0 w-3/5 h-full rounded-lg overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-${
                  // Randomize image based on active year
                  ['1470549638415-0a0755be0619', '1535650493892-ebb2e0ba4a8b', '1550989119-eac0ce16fbc0', '1574337890277-78bb4b1a5the'][activeYearIndex % 4]
                }?auto=format&fit=crop&w=800&q=80`}
                alt="Historical moment"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for image load errors
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Community Values */}
        <div className="mt-20">
          <motion.h3 
            className="text-center text-primary-dark text-2xl font-bold mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Guiding Values
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl text-primary mb-4">
                🌱
              </div>
              <h4 className="text-primary-dark text-lg font-bold mb-2">Sustainability Above All</h4>
              <p className="text-neutral-dark">
                Every decision we make—from sourcing to serving—is guided by its environmental impact. We believe delicious food shouldn't cost the Earth.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl text-primary mb-4">
                🤝
              </div>
              <h4 className="text-primary-dark text-lg font-bold mb-2">Community Connection</h4>
              <p className="text-neutral-dark">
                We believe food is a powerful connector. Our restaurant serves as a hub for building relationships between eaters, growers, and the land.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl text-primary mb-4">
                🔍
              </div>
              <h4 className="text-primary-dark text-lg font-bold mb-2">Radical Transparency</h4>
              <p className="text-neutral-dark">
                We believe you have the right to know exactly where your food comes from, how it was grown, and its journey to your plate.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-dark">{selectedEvent.title}</h3>
                    <div className="text-primary font-medium">{selectedEvent.year}</div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  {selectedEvent.description}
                  
                  {/* Extended narrative for modal - just a bit more detail */}
                  <span className="block mt-4">
                    {selectedEvent.year === '2015' && 
                      "Maria, with a background in sustainable agriculture, and David, a trained chef, met while working at a Charlotte farmers' market. Their shared frustration with restaurants claiming 'local' ingredients while sourcing from industrial farms sparked the idea for a truly transparent, sustainable dining concept."}
                    
                    {selectedEvent.year === '2016' && 
                      "The team spent countless hours on farms across the Charlotte region, working alongside farmers during harvests, learning about sustainable growing methods, and building relationships that would become the foundation of our supply chain. These firsthand experiences shaped our understanding of the challenges and rewards of local food systems."}
                    
                    {selectedEvent.year === '2017' && 
                      "Our pop-up dinners became anticipated events in Charlotte's food scene. Each dinner featured a hyperlocal menu and included stories about the farms where ingredients were sourced. These events not only refined our culinary approach but also built a community of supporters who shared our vision for sustainable dining."}
                    
                    {selectedEvent.year === '2018' && 
                      "The search for our permanent home led us to a historic building in NoDa with a neglected backyard space. We saw the potential to transform this urban lot into a productive garden. The renovation used reclaimed materials from Charlotte buildings, including the distinctive hardwood flooring salvaged from a 100-year-old warehouse."}
                    
                    {selectedEvent.year === '2019' && 
                      "Our grand opening coincided with the spring harvest, allowing us to showcase the best of the season's produce. Our kitchen implemented a zero-waste philosophy from day one, with comprehensive composting, creative use of trim and 'scraps,' and minimalist packaging for takeout orders."}
                    
                    {selectedEvent.year === '2020' && 
                      "When dining rooms closed, we quickly pivoted to creating farm boxes and meal kits. This not only kept our staff employed but ensured our farm partners still had a market for their produce. We also implemented a 'Pay It Forward' program that allowed customers to donate meals to healthcare workers."}
                    
                    {selectedEvent.year === '2021' && 
                      "As we welcomed guests back to our dining room, we expanded our garden to include more heirloom varieties and experimental crops. Our education programs were born from guests constantly asking how they could implement sustainable practices at home, inspiring workshops on everything from fermentation to composting."}
                    
                    {selectedEvent.year === '2022' && 
                      "Our technology innovations came from a desire to make our food's journey more tangible for guests. Working with local developers, we created a system that tracks ingredients from seed to plate, and an AR experience that brings these stories to life right at the table."}
                    
                    {selectedEvent.year === '2023' && 
                      "The recognition we received validated our approach but also brought new opportunities to share our story more widely. Being featured in national publications allowed us to advocate for sustainable restaurant practices and connect with like-minded establishments across the country."}
                    
                    {selectedEvent.year === '2024' && 
                      "Today, we're focused on scaling our impact beyond our restaurant walls. Our seed library preserves heirloom varieties with cultural significance to the Carolinas. Our mentorship program pairs experienced farmers with newcomers, particularly focusing on traditionally underrepresented groups in agriculture. And our cooking academy makes sustainable food practices accessible to home cooks."}
                  </span>
                </p>
                
                {selectedEvent.achievements && (
                  <div className="mb-6">
                    <h4 className="text-primary-dark font-medium mb-2">Key Milestones:</h4>
                    <ul className="space-y-2">
                      {selectedEvent.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-accent mr-2 mt-1">✓</span>
                          <span className="text-neutral-dark">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OriginStory;