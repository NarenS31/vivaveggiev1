import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for the gamification system
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

interface LoyaltyLevel {
  level: number;
  name: string;
  pointsRequired: number;
  benefits: string[];
  icon: string;
}

interface PointAction {
  id: string;
  name: string;
  points: number;
  icon: string;
}

interface UserProgress {
  points: number;
  achievements: string[];
  level: number;
  visits: number;
  sustainableChoices: number;
  localIngredients: number;
}

// Define available achievements
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    name: 'First-Time Visitor',
    description: 'Welcome to VivaVeggie! Your journey to sustainable dining starts here.',
    icon: '🏆',
    points: 50
  },
  {
    id: 'ingredient_explorer',
    name: 'Ingredient Explorer',
    description: 'You\'ve explored our ingredient sourcing map and learned about our local farms.',
    icon: '🗺️',
    points: 75
  },
  {
    id: 'menu_master',
    name: 'Menu Master',
    description: 'You\'ve viewed all categories on our seasonal menu.',
    icon: '📜',
    points: 100
  },
  {
    id: 'tour_completion',
    name: 'Virtual Tour Guide',
    description: 'You\'ve completed the entire virtual restaurant tour.',
    icon: '🔍',
    points: 150
  },
  {
    id: 'sustainability_advocate',
    name: 'Sustainability Advocate',
    description: 'You\'ve learned about 5 different sustainable practices we implement.',
    icon: '♻️',
    points: 200
  },
  {
    id: 'local_produce_enthusiast',
    name: 'Local Produce Enthusiast',
    description: 'You\'ve discovered the journey of 10 local ingredients from farm to table.',
    icon: '🌱',
    points: 225
  },
  {
    id: 'seasonal_connoisseur',
    name: 'Seasonal Connoisseur',
    description: 'You\'ve explored seasonal menus across all four seasons.',
    icon: '🍂',
    points: 250
  },
  {
    id: 'zero_waste_hero',
    name: 'Zero Waste Hero',
    description: 'You\'ve learned about our complete zero-waste cycle.',
    icon: '📦',
    points: 300
  }
];

// Define loyalty levels
export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  {
    level: 1,
    name: 'Sprout',
    pointsRequired: 0,
    benefits: ['Welcome gift on first visit'],
    icon: '🌱'
  },
  {
    level: 2,
    name: 'Seedling',
    pointsRequired: 200,
    benefits: ['5% off your next order', 'Priority reservations'],
    icon: '🌿'
  },
  {
    level: 3,
    name: 'Grower',
    pointsRequired: 500,
    benefits: ['10% off your next order', 'Complimentary herb bouquet', 'Kitchen tour access'],
    icon: '🌳'
  },
  {
    level: 4,
    name: 'Harvester',
    pointsRequired: 1000,
    benefits: ['15% off your next order', 'Chef\'s special tasting', 'Seasonal recipe booklet'],
    icon: '🌽'
  },
  {
    level: 5,
    name: 'Cultivator',
    pointsRequired: 2000,
    benefits: ['20% off your next order', 'Private dining event discount', 'Seasonal cooking class'],
    icon: '👨‍🌾'
  }
];

// Define available point actions
export const POINT_ACTIONS: PointAction[] = [
  {
    id: 'place_order',
    name: 'Place an Order',
    points: 50,
    icon: '🍽️'
  },
  {
    id: 'visit_restaurant',
    name: 'Visit the Restaurant',
    points: 25,
    icon: '🏡'
  },
  {
    id: 'complete_survey',
    name: 'Complete Feedback Survey',
    points: 30,
    icon: '📝'
  },
  {
    id: 'share_social',
    name: 'Share on Social Media',
    points: 20,
    icon: '📱'
  },
  {
    id: 'refer_friend',
    name: 'Refer a Friend',
    points: 100,
    icon: '👥'
  },
  {
    id: 'sustainable_choice',
    name: 'Choose a Seasonal Special',
    points: 15,
    icon: '🍃'
  }
];

// Default user progress
const DEFAULT_USER_PROGRESS: UserProgress = {
  points: 0,
  achievements: [],
  level: 1,
  visits: 0,
  sustainableChoices: 0,
  localIngredients: 0
};

// Create Context for the Gamification System
interface GameContextType {
  userProgress: UserProgress;
  achievements: Achievement[];
  loyaltyLevels: LoyaltyLevel[];
  awardPoints: (action: PointAction) => void;
  unlockAchievement: (achievementId: string) => void;
  getCurrentLevel: () => LoyaltyLevel;
  getNextLevel: () => LoyaltyLevel | null;
  pointsToNextLevel: () => number;
  showPopup: (message: string, icon?: string, duration?: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    // In a real app, we would load from localStorage or a database
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : DEFAULT_USER_PROGRESS;
  });
  
  const [popupInfo, setPopupInfo] = useState<{ 
    visible: boolean; 
    message: string; 
    icon?: string;
  }>({ visible: false, message: '' });

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Function to award points for actions
  const awardPoints = (action: PointAction) => {
    setUserProgress(prev => {
      const updatedPoints = prev.points + action.points;
      
      // Determine new level based on points
      let newLevel = prev.level;
      for (const level of LOYALTY_LEVELS) {
        if (updatedPoints >= level.pointsRequired) {
          newLevel = Math.max(newLevel, level.level);
        }
      }
      
      // If leveled up, show a popup
      if (newLevel > prev.level) {
        const newLevelInfo = LOYALTY_LEVELS.find(l => l.level === newLevel);
        if (newLevelInfo) {
          showPopup(`🎉 Level Up! You are now a ${newLevelInfo.name}`, newLevelInfo.icon);
        }
      }
      
      return {
        ...prev,
        points: updatedPoints,
        level: newLevel,
        visits: action.id === 'visit_restaurant' ? prev.visits + 1 : prev.visits,
        sustainableChoices: action.id === 'sustainable_choice' ? prev.sustainableChoices + 1 : prev.sustainableChoices
      };
    });
    
    // Show a popup for the points earned
    showPopup(`+${action.points} points: ${action.name}`, action.icon);
  };

  // Function to unlock achievements
  const unlockAchievement = (achievementId: string) => {
    // Check if the achievement is already unlocked
    if (userProgress.achievements.includes(achievementId)) {
      return;
    }
    
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) {
      return;
    }
    
    setUserProgress(prev => {
      const updatedPoints = prev.points + achievement.points;
      
      // Determine new level based on points
      let newLevel = prev.level;
      for (const level of LOYALTY_LEVELS) {
        if (updatedPoints >= level.pointsRequired) {
          newLevel = Math.max(newLevel, level.level);
        }
      }
      
      return {
        ...prev,
        points: updatedPoints,
        achievements: [...prev.achievements, achievementId],
        level: newLevel
      };
    });
    
    // Show a popup for the achievement
    showPopup(`🏆 Achievement Unlocked: ${achievement.name}`, achievement.icon, 4000);
  };

  // Get current loyalty level
  const getCurrentLevel = (): LoyaltyLevel => {
    return (
      LOYALTY_LEVELS.find(l => l.level === userProgress.level) || 
      LOYALTY_LEVELS[0]
    );
  };

  // Get next loyalty level
  const getNextLevel = (): LoyaltyLevel | null => {
    const nextLevelIndex = LOYALTY_LEVELS.findIndex(l => l.level === userProgress.level) + 1;
    return nextLevelIndex < LOYALTY_LEVELS.length ? LOYALTY_LEVELS[nextLevelIndex] : null;
  };

  // Calculate points to next level
  const pointsToNextLevel = (): number => {
    const nextLevel = getNextLevel();
    return nextLevel ? nextLevel.pointsRequired - userProgress.points : 0;
  };

  // Show a popup message
  const showPopup = (message: string, icon?: string, duration: number = 3000) => {
    setPopupInfo({ visible: true, message, icon });
    
    // Auto hide after duration
    setTimeout(() => {
      setPopupInfo(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  return (
    <GameContext.Provider 
      value={{
        userProgress,
        achievements: ACHIEVEMENTS,
        loyaltyLevels: LOYALTY_LEVELS,
        awardPoints,
        unlockAchievement,
        getCurrentLevel,
        getNextLevel,
        pointsToNextLevel,
        showPopup
      }}
    >
      {children}
      
      {/* Popup Animation */}
      <AnimatePresence>
        {popupInfo.visible && (
          <motion.div
            className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50 flex items-center"
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {popupInfo.icon && (
              <span className="text-2xl mr-3">{popupInfo.icon}</span>
            )}
            <p className="font-medium">{popupInfo.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GameContext.Provider>
  );
};

// Custom hook for using the gamification system
export const useGameSystem = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameSystem must be used within a GameProvider');
  }
  return context;
};

// LoyaltyProgramCard Component - can be used on any page
export const LoyaltyProgramCard: React.FC = () => {
  const { 
    userProgress, 
    getCurrentLevel, 
    getNextLevel, 
    pointsToNextLevel,
    achievements
  } = useGameSystem();
  
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progress = nextLevel ? 
    ((userProgress.points - currentLevel.pointsRequired) / 
    (nextLevel.pointsRequired - currentLevel.pointsRequired)) * 100 : 100;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-primary-dark">Your Sustainability Journey</h3>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{currentLevel.icon}</span>
          <span className="font-medium text-primary">{currentLevel.name}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress to {nextLevel?.name || 'Max Level'}</span>
          <span>{userProgress.points} points</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {nextLevel && (
          <div className="text-xs text-right mt-1 text-gray-600">
            {pointsToNextLevel()} points to next level
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-3xl text-primary-dark">{userProgress.visits}</div>
          <div className="text-xs text-gray-600">Restaurant Visits</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-3xl text-primary-dark">{userProgress.achievements.length}</div>
          <div className="text-xs text-gray-600">Achievements</div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-primary-dark mb-2">Current Level Benefits:</h4>
        <ul className="text-sm space-y-1">
          {currentLevel.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      {nextLevel && (
        <div>
          <h4 className="font-medium text-primary-dark mb-2">Next Level Benefits:</h4>
          <ul className="text-sm space-y-1 text-gray-600">
            {nextLevel.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="text-gray-400 mr-2">○</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6">
        <h4 className="font-medium text-primary-dark mb-2">Recent Achievements:</h4>
        <div className="flex flex-wrap gap-2">
          {achievements
            .filter(achievement => userProgress.achievements.includes(achievement.id))
            .slice(0, 5)
            .map(achievement => (
              <div 
                key={achievement.id}
                className="bg-primary/10 p-2 rounded-lg text-center"
                title={achievement.description}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="text-xs text-primary-dark mt-1">{achievement.name}</div>
              </div>
            ))}
          {userProgress.achievements.length === 0 && (
            <p className="text-sm text-gray-500 italic">Complete activities to earn achievements!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Simple point trigger component
export const PointActionButton: React.FC<{ 
  action: PointAction;
  className?: string;
}> = ({ action, className = '' }) => {
  const { awardPoints } = useGameSystem();
  
  return (
    <motion.button
      onClick={() => awardPoints(action)}
      className={`px-4 py-2 bg-white border border-primary-light rounded-lg shadow-sm hover:bg-primary-light/20 transition-colors flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-2">{action.icon}</span>
      <span className="font-medium text-primary-dark">{action.name}</span>
      <span className="ml-auto bg-primary-light text-primary px-2 py-1 rounded-full text-xs">+{action.points}</span>
    </motion.button>
  );
};

// Achievement showcase component
export const AchievementShowcase: React.FC = () => {
  const { achievements, userProgress, unlockAchievement } = useGameSystem();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map(achievement => {
          const isUnlocked = userProgress.achievements.includes(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                isUnlocked ? 'bg-primary-light' : 'bg-gray-100 opacity-75'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">{achievement.icon}</div>
                <h4 className="font-medium text-primary-dark">{achievement.name}</h4>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{achievement.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs font-medium text-primary">+{achievement.points} points</span>
                {isUnlocked ? (
                  <span className="text-green-500 text-sm">Unlocked</span>
                ) : (
                  <span className="text-gray-400 text-sm">Locked</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{selectedAchievement.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark">{selectedAchievement.name}</h3>
                    <div className="text-sm text-primary">+{selectedAchievement.points} points</div>
                  </div>
                </div>
                
                <p className="text-neutral-dark mb-6">{selectedAchievement.description}</p>
                
                <div className="flex justify-end space-x-3">
                  {/* For demo purposes, we'll add a button to unlock achievements */}
                  {!userProgress.achievements.includes(selectedAchievement.id) && (
                    <button
                      onClick={() => {
                        unlockAchievement(selectedAchievement.id);
                        setSelectedAchievement(null);
                      }}
                      className="px-4 py-2 bg-primary-light text-primary rounded-lg shadow-sm hover:bg-primary-light/80 transition-colors"
                    >
                      Unlock (Demo)
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};