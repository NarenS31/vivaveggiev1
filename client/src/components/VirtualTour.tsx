import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import diningRoomSvg from '../assets/tour/dining-room.svg';
import kitchenSvg from '../assets/tour/kitchen.svg';
import gardenSvg from '../assets/tour/garden.svg';

// Tour points that users can navigate to
export interface TourPoint {
  id: string;
  name: string;
  image: string;
  description: string;
  nextPoints: string[];
  factoids: string[];
  hotspots: Hotspot[];
  achievements?: Achievement[];
}

// Hotspots that users can click on for more information
interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  image?: string;
}

// Achievements that users can unlock during the tour
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// Tour data
const tourPoints: TourPoint[] = [
  {
    id: 'dining-room',
    name: 'Dining Room',
    image: diningRoomSvg,
    description: 'Our bright and airy dining room features natural materials and green accents, reflecting our commitment to sustainability. Each table is adorned with fresh herbs from our garden.',
    nextPoints: ['kitchen', 'garden'],
    factoids: [
      'All our furniture is made from reclaimed wood and sustainably sourced materials.',
      'The lighting fixtures are energy-efficient LEDs that mimic natural daylight.',
      'Our table settings are made from biodegradable materials, including plant-based "plastics".'
    ],
    hotspots: [
      {
        id: 'tables',
        x: 50,
        y: 60,
        title: 'Sustainable Tables',
        description: 'Our tables are crafted from reclaimed oak barrels from local wineries. Each one tells a story of local craftsmanship and sustainability.'
      },
      {
        id: 'plants',
        x: 15,
        y: 55,
        title: 'Living Plants',
        description: 'We incorporate living plants throughout our dining space to improve air quality and create a connection to nature while dining.'
      },
      {
        id: 'lighting',
        x: 40,
        y: 20,
        title: 'Energy-Efficient Lighting',
        description: 'Our pendant lights use 75% less energy than traditional restaurant lighting and are designed to mimic the color spectrum of natural sunlight.'
      }
    ],
    achievements: [
      {
        id: 'dining-explorer',
        name: 'Dining Explorer',
        description: 'You explored the dining room and discovered our commitment to sustainable furnishings.',
        icon: '🪑',
        unlocked: false
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: kitchenSvg,
    description: 'Our open kitchen concept allows you to see our chefs in action, preparing farm-fresh ingredients with care and creativity.',
    nextPoints: ['dining-room', 'garden'],
    factoids: [
      'Our kitchen uses 40% less energy than traditional restaurant kitchens.',
      'All food waste is composted and returned to our garden as nutrients.',
      'We use induction cooking technology that reduces heat waste and creates a cooler working environment.'
    ],
    hotspots: [
      {
        id: 'chef-station',
        x: 35,
        y: 70,
        title: 'Chef\'s Station',
        description: 'Watch our head chef transform freshly harvested ingredients into culinary masterpieces right before your eyes.'
      },
      {
        id: 'herb-wall',
        x: 70,
        y: 30,
        title: 'Living Herb Wall',
        description: 'Our indoor herb wall allows chefs to snip fresh herbs moments before they\'re added to your dish, ensuring maximum flavor and nutrition.'
      },
      {
        id: 'zero-waste',
        x: 20,
        y: 40,
        title: 'Zero-Waste System',
        description: 'Our kitchen implements a comprehensive zero-waste system, where trim and scraps are repurposed into stock, sauces, or returned to our compost system.'
      }
    ],
    achievements: [
      {
        id: 'kitchen-observer',
        name: 'Kitchen Observer',
        description: 'You witnessed our sustainable kitchen practices and farm-to-table preparation methods.',
        icon: '👨‍🍳',
        unlocked: false
      }
    ]
  },
  {
    id: 'garden',
    name: 'Vegetable Garden',
    image: gardenSvg,
    description: 'Our on-site vegetable garden supplies many of the fresh ingredients used in our kitchen daily, reducing food miles to mere steps.',
    nextPoints: ['kitchen', 'dining-room'],
    factoids: [
      'We grow over 30 varieties of vegetables, herbs, and edible flowers seasonally.',
      'Our garden is maintained using organic, permaculture principles.',
      'Rainwater collection systems provide 80% of our garden\'s irrigation needs.'
    ],
    hotspots: [
      {
        id: 'veggie-beds',
        x: 40,
        y: 70,
        title: 'Raised Garden Beds',
        description: 'Our raised beds use companion planting techniques to naturally deter pests and enhance growth without chemicals.'
      },
      {
        id: 'compost',
        x: 75,
        y: 60,
        title: 'Compost System',
        description: 'Food scraps from the kitchen are transformed into nutrient-rich compost here, completing our sustainability cycle.'
      },
      {
        id: 'rainwater',
        x: 20,
        y: 40,
        title: 'Rainwater Collection',
        description: 'This advanced rainwater harvesting system collects water from our roof for garden irrigation, reducing our water footprint.'
      }
    ],
    achievements: [
      {
        id: 'garden-enthusiast',
        name: 'Garden Enthusiast',
        description: 'You explored our organic garden and learned about our sustainable growing practices.',
        icon: '🌱',
        unlocked: false
      }
    ]
  }
];

const VirtualTour: React.FC = () => {
  const [currentPoint, setCurrentPoint] = useState<TourPoint>(tourPoints[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [tourCompleted, setTourCompleted] = useState(false);
  const [visitedPoints, setVisitedPoints] = useState<string[]>(['dining-room']);

  // Function to navigate to a different point in the tour
  const navigateTo = (pointId: string) => {
    const point = tourPoints.find(p => p.id === pointId);
    if (point) {
      setCurrentPoint(point);
      
      // Add to visited points if not already visited
      if (!visitedPoints.includes(pointId)) {
        setVisitedPoints([...visitedPoints, pointId]);
        
        // Check for achievements
        if (point.achievements) {
          const newAchievements = point.achievements.filter(a => !userAchievements.includes(a.id)).map(a => a.id);
          
          if (newAchievements.length > 0) {
            const achievement = point.achievements.find(a => a.id === newAchievements[0]);
            if (achievement) {
              setUserAchievements([...userAchievements, ...newAchievements]);
              setPopupMessage(`🎉 Achievement Unlocked: ${achievement.name}`);
              setShowPopup(true);
              
              // Auto hide popup after 3 seconds
              setTimeout(() => {
                setShowPopup(false);
              }, 3000);
            }
          }
        }
      }
      
      // Check if all points have been visited
      const allPointIds = tourPoints.map(p => p.id);
      const willBeVisited = [...visitedPoints, pointId];
      const allVisited = allPointIds.every(id => willBeVisited.includes(id));
      
      if (allVisited && !tourCompleted) {
        setTourCompleted(true);
        setTimeout(() => {
          setPopupMessage('🏆 Congratulations! You\'ve completed the full restaurant tour!');
          setShowPopup(true);
        }, 1000);
      }
    }
  };

  // Select a hotspot to view details
  const selectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
  };

  // Close hotspot details
  const closeHotspot = () => {
    setSelectedHotspot(null);
  };

  return (
    <section id="virtual-tour" className="py-16 md:py-24">
      <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-primary-dark/10 to-transparent">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Virtual Restaurant Tour</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">
            Explore our restaurant virtually and discover the sustainable practices behind our farm-to-table philosophy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Navigation */}
          <div className="bg-white p-6 rounded-lg shadow-lg order-2 lg:order-1">
            <h3 className="font-heading text-xl text-primary-dark mb-4">Tour Locations</h3>
            <div className="space-y-4">
              {tourPoints.map((point) => (
                <motion.button
                  key={point.id}
                  onClick={() => navigateTo(point.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all border ${
                    currentPoint.id === point.id 
                      ? 'bg-primary-light border-primary' 
                      : 'hover:bg-neutral-50 border-neutral-200'
                  } ${visitedPoints.includes(point.id) ? 'visited' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      visitedPoints.includes(point.id) ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <h4 className="font-medium text-primary-dark">{point.name}</h4>
                  </div>
                  <p className="text-sm text-neutral-dark mt-1 line-clamp-2">
                    {point.description.substring(0, 80)}...
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Achievements Section */}
            <div className="mt-8">
              <h3 className="font-heading text-xl text-primary-dark mb-4">Your Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {tourPoints.flatMap(point => point.achievements || []).map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-2 rounded-lg ${
                      userAchievements.includes(achievement.id) 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    title={userAchievements.includes(achievement.id) ? achievement.description : 'Achievement locked'}
                  >
                    <div className="text-xl">{achievement.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Tour Display */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-heading text-2xl text-primary-dark mb-2">{currentPoint.name}</h3>
              <p className="text-neutral-dark mb-4">{currentPoint.description}</p>
              
              {/* Tour Image with Hotspots */}
              <div className="relative w-full h-[450px] rounded-lg overflow-hidden mb-6">
                <img 
                  src={currentPoint.image} 
                  alt={`${currentPoint.name} view`} 
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Hotspot indicators */}
                {currentPoint.hotspots.map(hotspot => (
                  <motion.button
                    key={hotspot.id}
                    className="absolute w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onClick={() => selectHotspot(hotspot)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-sm">i</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <div className="text-neutral-dark text-sm">
                  <strong>Did you know?</strong> {currentPoint.factoids[Math.floor(Math.random() * currentPoint.factoids.length)]}
                </div>
                <div className="flex space-x-2">
                  {currentPoint.nextPoints.map(nextId => {
                    const nextPoint = tourPoints.find(p => p.id === nextId);
                    return nextPoint ? (
                      <motion.button
                        key={nextId}
                        onClick={() => navigateTo(nextId)}
                        className="px-4 py-2 bg-primary text-white rounded-lg shadow-md transition-colors hover:bg-primary-dark"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Visit {nextPoint.name}
                      </motion.button>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspot Detail Modal */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeHotspot}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-2">{selectedHotspot.title}</h3>
                <p className="text-neutral-dark">{selectedHotspot.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  onClick={closeHotspot}
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-dark transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <p className="font-medium">{popupMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VirtualTour;