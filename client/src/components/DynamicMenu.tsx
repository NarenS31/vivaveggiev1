import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameSystem, POINT_ACTIONS } from './GameElements';

// Menu item interface
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  tags: string[];
  seasonality: ('spring' | 'summer' | 'fall' | 'winter')[];
  image: string;
  carbonFootprint: number; // Lower is better (1-100)
  nutritionScore: number; // Higher is better (1-100)
  popularity: number; // Higher is more popular (1-100)
}

// User preference interface
interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteTags: string[];
  preferredSeasonality: boolean;
  sustainabilityFocus: number; // 1-100
  nutritionFocus: number; // 1-100
}

// Fake menu items for demo
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Seasonal Harvest Bowl",
    description: "A vibrant bowl of locally-sourced seasonal vegetables, ancient grains, and herb-infused olive oil.",
    price: 16.95,
    ingredients: ["seasonal vegetables", "quinoa", "farro", "olive oil", "fresh herbs", "lemon"],
    tags: ["vegan", "gluten-free", "high-protein", "sustainable"],
    seasonality: ["spring", "summer"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 20,
    nutritionScore: 90,
    popularity: 85
  },
  {
    id: 2,
    name: "Forest Mushroom Risotto",
    description: "Creamy arborio rice cooked with locally-foraged mushrooms, white wine, and truffle oil.",
    price: 18.95,
    ingredients: ["arborio rice", "local mushrooms", "white wine", "truffle oil", "parmesan"],
    tags: ["vegetarian", "gluten-free", "farm-to-table"],
    seasonality: ["fall", "winter"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 35,
    nutritionScore: 75,
    popularity: 90
  },
  {
    id: 3,
    name: "Heritage Tomato & Basil Tart",
    description: "Flaky pastry topped with heirloom tomatoes, fresh basil, and cashew ricotta from our garden.",
    price: 15.95,
    ingredients: ["pastry", "heirloom tomatoes", "basil", "cashew ricotta", "balsamic glaze"],
    tags: ["vegan", "farm-to-table", "local"],
    seasonality: ["summer"],
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 25,
    nutritionScore: 80,
    popularity: 75
  },
  {
    id: 4,
    name: "Root Vegetable Wellington",
    description: "Winter root vegetables and lentils wrapped in a golden puff pastry with rosemary-infused gravy.",
    price: 20.95,
    ingredients: ["root vegetables", "lentils", "puff pastry", "rosemary", "gravy"],
    tags: ["vegan", "hearty", "winter-special"],
    seasonality: ["fall", "winter"],
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 30,
    nutritionScore: 85,
    popularity: 70
  },
  {
    id: 5,
    name: "Spring Pea & Mint Linguine",
    description: "Fresh linguine tossed with spring peas, mint pesto, and lemon zest.",
    price: 17.95,
    ingredients: ["linguine", "spring peas", "mint", "lemon", "pine nuts"],
    tags: ["vegetarian", "spring-special", "pasta"],
    seasonality: ["spring"],
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 40,
    nutritionScore: 70,
    popularity: 80
  },
  {
    id: 6,
    name: "Charred Broccoli & Ancient Grain Salad",
    description: "Flame-grilled broccoli with a mix of ancient grains, dried cranberries, and tahini dressing.",
    price: 15.95,
    ingredients: ["broccoli", "ancient grains", "dried cranberries", "tahini", "lemon"],
    tags: ["vegan", "gluten-free", "high-protein", "salad"],
    seasonality: ["spring", "summer", "fall", "winter"],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 15,
    nutritionScore: 95,
    popularity: 65
  },
  {
    id: 7,
    name: "Summer Berry Gazpacho",
    description: "A refreshing chilled soup made with summer berries, cucumber, and garden herbs.",
    price: 12.95,
    ingredients: ["summer berries", "cucumber", "garden herbs", "olive oil", "balsamic vinegar"],
    tags: ["vegan", "gluten-free", "raw", "summer-special"],
    seasonality: ["summer"],
    image: "https://images.unsplash.com/photo-1583946099390-4ed646ee9be4?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 10,
    nutritionScore: 90,
    popularity: 60
  },
  {
    id: 8,
    name: "Autumn Squash & Sage Gnocchi",
    description: "Hand-rolled potato gnocchi with roasted autumn squash, crispy sage, and brown butter sauce.",
    price: 19.95,
    ingredients: ["potato gnocchi", "autumn squash", "sage", "butter"],
    tags: ["vegetarian", "fall-special", "pasta"],
    seasonality: ["fall"],
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80",
    carbonFootprint: 45,
    nutritionScore: 65,
    popularity: 85
  }
];

// Default user preferences
const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  favoriteTags: [],
  preferredSeasonality: true,
  sustainabilityFocus: 50,
  nutritionFocus: 50
};

const DynamicMenu: React.FC = () => {
  // State
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [currentSeason, setCurrentSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('summer');
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Access game system
  const { unlockAchievement, awardPoints } = useGameSystem();
  
  // Determine current season based on date
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    
    if (month >= 2 && month <= 4) {
      setCurrentSeason('spring');
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason('summer');
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason('fall');
    } else {
      setCurrentSeason('winter');
    }
  }, []);

  // Filter items based on user preferences and active tag
  useEffect(() => {
    let filtered = [...menuItems];
    
    // Filter by dietary restrictions
    if (userPreferences.dietaryRestrictions.length > 0) {
      filtered = filtered.filter(item => {
        // An item is included if it has ALL the tags from dietary restrictions
        return userPreferences.dietaryRestrictions.every(restriction => 
          item.tags.includes(restriction)
        );
      });
    }
    
    // Filter by active tag if set
    if (activeTag) {
      filtered = filtered.filter(item => item.tags.includes(activeTag));
    }
    
    // Filter by seasonality if preferred
    if (userPreferences.preferredSeasonality) {
      filtered = filtered.filter(item => item.seasonality.includes(currentSeason));
    }
    
    // Sort by combined score based on user preferences
    filtered.sort((a, b) => {
      const aScore = 
        ((100 - a.carbonFootprint) * userPreferences.sustainabilityFocus / 100) + 
        (a.nutritionScore * userPreferences.nutritionFocus / 100) +
        (userPreferences.favoriteTags.some(tag => a.tags.includes(tag)) ? 20 : 0);
      
      const bScore = 
        ((100 - b.carbonFootprint) * userPreferences.sustainabilityFocus / 100) + 
        (b.nutritionScore * userPreferences.nutritionFocus / 100) +
        (userPreferences.favoriteTags.some(tag => b.tags.includes(tag)) ? 20 : 0);
      
      return bScore - aScore;
    });
    
    setFilteredItems(filtered);
    
    // For demo: Unlock achievement if the user has viewed a seasonal menu
    if (userPreferences.preferredSeasonality) {
      unlockAchievement('seasonal_connoisseur');
    }
    
    // For demo: If the user has applied filters matching sustainability criteria
    if (userPreferences.sustainabilityFocus > 70) {
      unlockAchievement('sustainability_advocate');
    }
  }, [activeTag, userPreferences, currentSeason, unlockAchievement]);

  // Update a dietary restriction preference
  const toggleDietaryRestriction = (restriction: string) => {
    setUserPreferences(prev => {
      const newRestrictions = prev.dietaryRestrictions.includes(restriction) 
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction];
      
      return {
        ...prev,
        dietaryRestrictions: newRestrictions
      };
    });
  };

  // Update a favorite tag
  const toggleFavoriteTag = (tag: string) => {
    setUserPreferences(prev => {
      const newFavoriteTags = prev.favoriteTags.includes(tag) 
        ? prev.favoriteTags.filter(t => t !== tag)
        : [...prev.favoriteTags, tag];
      
      return {
        ...prev,
        favoriteTags: newFavoriteTags
      };
    });
  };

  // Reset preferences to default
  const resetPreferences = () => {
    setUserPreferences(defaultPreferences);
    setActiveTag(null);
  };

  // Select a menu item to view details
  const viewItemDetails = (item: MenuItem) => {
    setSelectedItem(item);
    
    // Award points for exploring seasonal items
    if (item.seasonality.includes(currentSeason)) {
      awardPoints(POINT_ACTIONS.find(a => a.id === 'sustainable_choice')!);
    }
  };

  // Generate all unique tags from menu items
  const allTags = Array.from(new Set(menuItems.flatMap(item => item.tags)));
  
  // Dietary restrictions options
  const dietaryOptions = ['vegan', 'vegetarian', 'gluten-free'];

  return (
    <section id="dynamic-menu" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Seasonal Menu</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">
            Our menu adapts to your preferences and the seasons, highlighting the freshest local ingredients
          </p>
        </motion.div>

        {/* Current Season Indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary-light/20 px-6 py-3 rounded-full flex items-center">
            <span className="text-primary font-medium mr-2">Current Season:</span>
            <span className="text-primary-dark font-semibold capitalize">{currentSeason}</span>
            <span className="ml-3 text-xl">
              {currentSeason === 'spring' && '🌱'}
              {currentSeason === 'summer' && '☀️'}
              {currentSeason === 'fall' && '🍂'}
              {currentSeason === 'winter' && '❄️'}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg text-primary-dark">Filters</h3>
                <button 
                  onClick={resetPreferences}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Reset
                </button>
              </div>

              {/* Menu Tag Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Categories</h4>
                <div className="space-y-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={`px-3 py-1 rounded-full text-sm w-full text-left ${
                        activeTag === tag 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Dietary Needs</h4>
                <div className="space-y-2">
                  {dietaryOptions.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`diet-${option}`}
                        checked={userPreferences.dietaryRestrictions.includes(option)}
                        onChange={() => toggleDietaryRestriction(option)}
                        className="w-4 h-4 text-primary focus:ring-primary-light rounded"
                      />
                      <label htmlFor={`diet-${option}`} className="ml-2 text-sm text-gray-700 capitalize">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonality Toggle */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="seasonality"
                    checked={userPreferences.preferredSeasonality}
                    onChange={() => setUserPreferences(prev => ({
                      ...prev,
                      preferredSeasonality: !prev.preferredSeasonality
                    }))}
                    className="w-4 h-4 text-primary focus:ring-primary-light rounded"
                  />
                  <label htmlFor="seasonality" className="ml-2 text-sm text-gray-700">
                    Show seasonal items only
                  </label>
                </div>
              </div>

              {/* Sliders for Preferences */}
              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Sustainability Focus</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userPreferences.sustainabilityFocus}
                  onChange={(e) => setUserPreferences(prev => ({
                    ...prev,
                    sustainabilityFocus: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Nutrition Focus</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userPreferences.nutritionFocus}
                  onChange={(e) => setUserPreferences(prev => ({
                    ...prev,
                    nutritionFocus: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Favorite Tags */}
              <div>
                <h4 className="font-medium text-primary-dark mb-2">Favorite Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={`fav-${tag}`}
                      onClick={() => toggleFavoriteTag(tag)}
                      className={`px-2 py-1 rounded-full text-xs ${
                        userPreferences.favoriteTags.includes(tag) 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Filters
            </button>
            
            <div className="text-sm text-gray-600">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} shown
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
                <button
                  onClick={resetPreferences}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => viewItemDetails(item)}
                  >
                    <div className="relative h-48">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback for image load errors
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=500&q=80';
                        }}
                      />
                      {item.seasonality.includes(currentSeason) && (
                        <div className="absolute top-3 right-3 bg-primary-dark text-white text-xs px-2 py-1 rounded-full">
                          In Season
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-lg text-primary-dark font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-neutral-dark mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-primary-dark">${item.price.toFixed(2)}</span>
                        <div className="flex space-x-1">
                          {/* Sustainability Icon */}
                          <div className="flex items-center text-xs" title="Sustainability Score">
                            <span className="mr-1">🌱</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${100 - item.carbonFootprint}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Nutrition Icon */}
                          <div className="flex items-center text-xs" title="Nutrition Score">
                            <span className="mr-1">🥗</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-accent h-1.5 rounded-full" 
                                style={{ width: `${item.nutritionScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map(tag => (
                          <span 
                            key={`${item.id}-${tag}`}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              userPreferences.dietaryRestrictions.includes(tag) 
                                ? 'bg-primary-light text-primary-dark' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileFilter(false)}
          >
            <motion.div
              className="ml-auto w-4/5 max-w-md h-full bg-white overflow-y-auto p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-xl text-primary-dark">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilter(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Same filter content as desktop but for mobile */}
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <h4 className="font-medium text-primary-dark">Categories</h4>
                  <button 
                    onClick={resetPreferences}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Reset All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTag === tag 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rest of filters... */}
              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Dietary Needs</h4>
                <div className="space-y-2">
                  {dietaryOptions.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-diet-${option}`}
                        checked={userPreferences.dietaryRestrictions.includes(option)}
                        onChange={() => toggleDietaryRestriction(option)}
                        className="w-4 h-4 text-primary focus:ring-primary-light rounded"
                      />
                      <label htmlFor={`mobile-diet-${option}`} className="ml-2 text-gray-700 capitalize">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobile-seasonality"
                    checked={userPreferences.preferredSeasonality}
                    onChange={() => setUserPreferences(prev => ({
                      ...prev,
                      preferredSeasonality: !prev.preferredSeasonality
                    }))}
                    className="w-4 h-4 text-primary focus:ring-primary-light rounded"
                  />
                  <label htmlFor="mobile-seasonality" className="ml-2 text-gray-700">
                    Show seasonal items only
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Sustainability Focus</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userPreferences.sustainabilityFocus}
                  onChange={(e) => setUserPreferences(prev => ({
                    ...prev,
                    sustainabilityFocus: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-primary-dark mb-2">Nutrition Focus</h4>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userPreferences.nutritionFocus}
                  onChange={(e) => setUserPreferences(prev => ({
                    ...prev,
                    nutritionFocus: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                  Apply Filters ({filteredItems.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-56">
                <img 
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=500&q=80';
                  }}
                />
                {selectedItem.seasonality.includes(currentSeason) && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    In Season
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-primary-dark">{selectedItem.name}</h3>
                  <span className="font-medium text-primary-dark">${selectedItem.price.toFixed(2)}</span>
                </div>
                
                <p className="text-neutral-dark mb-4">{selectedItem.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-3">
                    {/* Sustainability Score */}
                    <div className="text-center">
                      <div className="text-2xl font-medium text-primary-dark">{100 - selectedItem.carbonFootprint}</div>
                      <div className="text-xs text-gray-500">Sustainability</div>
                    </div>
                    
                    {/* Nutrition Score */}
                    <div className="text-center">
                      <div className="text-2xl font-medium text-primary-dark">{selectedItem.nutritionScore}</div>
                      <div className="text-xs text-gray-500">Nutrition</div>
                    </div>
                    
                    {/* Popularity Score */}
                    <div className="text-center">
                      <div className="text-2xl font-medium text-primary-dark">{selectedItem.popularity}</div>
                      <div className="text-xs text-gray-500">Popularity</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <span>Seasonal in: </span>
                    <span className="font-medium capitalize">{selectedItem.seasonality.join(', ')}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-primary-dark mb-2">Ingredients</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedItem.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-light mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-6">
                  {selectedItem.tags.map(tag => (
                    <span 
                      key={`detail-${tag}`}
                      className="text-xs px-2 py-1 rounded-full bg-primary-light/20 text-primary-dark"
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-3 hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // For demo: Simulate adding to order
                      awardPoints(POINT_ACTIONS.find(a => a.id === 'place_order')!);
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Add to Order
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

export default DynamicMenu;