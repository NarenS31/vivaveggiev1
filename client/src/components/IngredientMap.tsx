import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngTuple, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

// Fix leaflet marker icon issue
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Define farm data for the map
interface Farm {
  id: number;
  name: string;
  location: LatLngTuple;
  ingredients: string[];
  distance: number; // distance in miles
  description: string;
  sustainabilityScore: number; // 1-100
  farmType: 'organic' | 'dairy' | 'orchard' | 'microgreens' | 'heritage';
  carbonFootprint: number; // 1-100 (lower is better)
}

// Define ingredient data
interface Ingredient {
  id: number;
  name: string;
  farmId: number;
  image: string;
  description: string;
  seasonality: string[];
  nutritionScore: number; // 1-100
  fallbackImage: string;
}

// Charlotte, NC center coordinates
const restaurantLocation: LatLngTuple = [35.2271, -80.8431];

// Sample data for our farms - with fixed and improved positioning
const farms: Farm[] = [
  {
    id: 1,
    name: "Green Valley Organics",
    location: [35.2271 + 0.03, -80.8431 - 0.04], // Positioned to the northeast
    ingredients: ["Tomatoes", "Lettuce", "Carrots", "Kale"],
    distance: 12,
    description: "Family-owned organic farm focused on sustainable growing practices and regenerative agriculture.",
    sustainabilityScore: 95,
    farmType: 'organic',
    carbonFootprint: 15,
  },
  {
    id: 2,
    name: "Carolina Heritage Farms",
    location: [35.2271 + 0.02, -80.8431 + 0.05], // Fixed: Positioned to the northwest
    ingredients: ["Mushrooms", "Herbs", "Edible Flowers"],
    distance: 8,
    description: "Specializing in heirloom varieties and rare herbs using natural growing methods.",
    sustainabilityScore: 92,
    farmType: 'heritage',
    carbonFootprint: 12,
  },
  {
    id: 3,
    name: "Harmony Valley Dairy",
    location: [35.2271 - 0.03, -80.8431 - 0.02], // Positioned to the southeast
    ingredients: ["Cheese", "Milk", "Butter"],
    distance: 15,
    description: "Animal welfare certified dairy producing small-batch artisanal cheeses and dairy products.",
    sustainabilityScore: 89,
    farmType: 'dairy',
    carbonFootprint: 25,
  },
  {
    id: 4,
    name: "Sunrise Orchards",
    location: [35.2271 - 0.04, -80.8431 + 0.03], // Fixed: Positioned to the southwest
    ingredients: ["Apples", "Berries", "Stone Fruits"],
    distance: 18,
    description: "Multi-generational orchard using integrated pest management and pollinator-friendly practices.",
    sustainabilityScore: 88,
    farmType: 'orchard',
    carbonFootprint: 20,
  },
  {
    id: 5,
    name: "Wild Earth Microgreens",
    location: [35.2271, -80.8431 - 0.08], // Positioned directly east
    ingredients: ["Microgreens", "Sprouts", "Specialty Greens"],
    distance: 5,
    description: "Urban vertical farm growing nutrient-dense microgreens using 95% less water than conventional farming.",
    sustainabilityScore: 98,
    farmType: 'microgreens',
    carbonFootprint: 5,
  }
];

// Sample ingredients data with reliable fallback images
const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    farmId: 1,
    image: "https://images.unsplash.com/photo-1582284540246-9726ba4a4a56?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=250&h=250&fit=crop",
    description: "Organically grown, vine-ripened heirloom tomatoes with rich flavor profiles.",
    seasonality: ["Summer", "Early Fall"],
    nutritionScore: 92
  },
  {
    id: 2,
    name: "Baby Kale",
    farmId: 1,
    image: "https://images.unsplash.com/photo-1515686413624-53f6f5aefb38?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1631954732421-ab3c97290342?w=250&h=250&fit=crop",
    description: "Tender young kale leaves harvested for optimal nutrition and mild flavor.",
    seasonality: ["Spring", "Fall"],
    nutritionScore: 98
  },
  {
    id: 3,
    name: "Shiitake Mushrooms",
    farmId: 2,
    image: "https://images.unsplash.com/photo-1504674641010-472d2f845079?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1543242594-c8bae8b9e708?w=250&h=250&fit=crop",
    description: "Forest-grown shiitake mushrooms cultivated on fallen oak logs.",
    seasonality: ["Year-round"],
    nutritionScore: 85
  },
  {
    id: 4,
    name: "Artisanal Goat Cheese",
    farmId: 3,
    image: "https://images.unsplash.com/photo-1552767080-9f3bf8123af2?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=250&h=250&fit=crop",
    description: "Small-batch goat cheese made from the milk of pasture-raised goats.",
    seasonality: ["Year-round"],
    nutritionScore: 78
  },
  {
    id: 5,
    name: "Mixed Berry Blend",
    farmId: 4,
    image: "https://images.unsplash.com/photo-1563746924237-f81951d2cdf8?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1599421498111-ad70bebb8404?w=250&h=250&fit=crop",
    description: "Seasonal mix of blackberries, blueberries, and raspberries.",
    seasonality: ["Summer"],
    nutritionScore: 95
  },
  {
    id: 6, 
    name: "Sunflower Microgreens",
    farmId: 5,
    image: "https://images.unsplash.com/photo-1535915087683-3bed29b9afb0?w=250&h=250&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=250&h=250&fit=crop",
    description: "Nutrient-dense microgreens with nutty flavor profile.",
    seasonality: ["Year-round"],
    nutritionScore: 99
  }
];

// Create farm-specific icons based on farm type
const getFarmIcon = (farmType: string) => {
  const iconSize = [30, 30];
  const colors = {
    organic: '#4ade80', // green
    heritage: '#a78bfa', // purple
    dairy: '#60a5fa', // blue
    orchard: '#f97316', // orange
    microgreens: '#10b981', // emerald
    restaurant: '#ef4444' // red for restaurant
  };
  
  let color = '#10b981'; // default color
  
  if (farmType in colors) {
    color = colors[farmType as keyof typeof colors];
  }
  
  return divIcon({
    className: '',
    iconSize: iconSize,
    html: `
      <div style="
        width: ${iconSize[0]}px; 
        height: ${iconSize[1]}px; 
        border-radius: 50%; 
        background-color: ${color}; 
        border: 2px solid white; 
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        ${farmType.charAt(0).toUpperCase()}
      </div>
    `
  });
};

// Restaurant icon
const restaurantIcon = divIcon({
  className: '',
  iconSize: [40, 40],
  html: `
    <div style="
      width: 40px; 
      height: 40px; 
      border-radius: 50%; 
      background-color: #ef4444; 
      border: 3px solid white; 
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
    ">
      R
    </div>
  `
});

// Component to fly to selected farm
const FlyToMarker: React.FC<{position: LatLngTuple, farmId: number | null}> = ({ position, farmId }) => {
  const map = useMap();
  
  useEffect(() => {
    if (farmId !== null) {
      map.flyTo(position, 12, {
        duration: 1.5
      });
    } else {
      map.flyTo(restaurantLocation, 10, {
        duration: 1.5
      });
    }
  }, [map, position, farmId]);
  
  return null;
};

// Weather display component simulation
const WeatherDisplay: React.FC<{farmLocation: LatLngTuple}> = ({ farmLocation }) => {
  // Simulate different weather conditions based on location
  const getWeatherData = () => {
    const lat = farmLocation[0];
    const lon = farmLocation[1];
    
    // Generate "random" but consistent weather based on coordinates
    const seed = (lat * 10 + lon * 10) % 10;
    
    const conditions = [
      "Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"
    ];
    
    const temperatures = [68, 72, 74, 70, 76];
    
    const index = Math.abs(Math.floor(seed)) % conditions.length;
    
    return {
      condition: conditions[index],
      temperature: temperatures[index],
      precipitation: index === 3 ? "30%" : "0%",
      humidity: 45 + index * 5,
    };
  };
  
  const weather = getWeatherData();
  
  return (
    <div className="bg-blue-50 p-2 rounded-md text-xs mb-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-blue-700">Current Weather</span>
        <span className="text-blue-800">{weather.condition}</span>
      </div>
      <div className="flex justify-between text-blue-600 mt-1">
        <span>{weather.temperature}°F</span>
        <span>Humidity: {weather.humidity}%</span>
      </div>
    </div>
  );
};

// Seasonal prediction component
const SeasonalForecast: React.FC<{ingredients: Ingredient[]}> = ({ ingredients }) => {
  const currentMonth = new Date().getMonth();
  
  // Season determination
  const getSeason = (month: number) => {
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    return "Winter";
  };
  
  const currentSeason = getSeason(currentMonth);
  const nextSeason = getSeason((currentMonth + 3) % 12);
  
  const inSeasonIngredients = ingredients.filter(ing => 
    ing.seasonality.includes(currentSeason) || ing.seasonality.includes("Year-round")
  );
  
  const upcomingIngredients = ingredients.filter(ing => 
    ing.seasonality.includes(nextSeason) && !ing.seasonality.includes(currentSeason) && !ing.seasonality.includes("Year-round")
  );
  
  return (
    <div className="border border-primary-light p-3 rounded-lg mt-4 bg-primary-light bg-opacity-5">
      <h5 className="font-semibold text-primary-dark text-sm mb-2">Seasonal Availability Forecast</h5>
      
      <div className="mb-3">
        <span className="text-xs font-medium text-primary">Currently In Season:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {inSeasonIngredients.length > 0 ? (
            inSeasonIngredients.map(ing => (
              <span key={ing.id} className="bg-primary bg-opacity-10 text-primary-dark text-xs px-2 py-0.5 rounded-full">
                {ing.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-dark italic">Limited seasonal items available</span>
          )}
        </div>
      </div>
      
      <div>
        <span className="text-xs font-medium text-secondary">Coming Next Season:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {upcomingIngredients.length > 0 ? (
            upcomingIngredients.map(ing => (
              <span key={ing.id} className="bg-secondary bg-opacity-10 text-secondary-dark text-xs px-2 py-0.5 rounded-full">
                {ing.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-dark italic">Planning next season's crops</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Sustainability calculator visualization
const SustainabilityCalculator: React.FC<{farm: Farm}> = ({ farm }) => {
  const milesAvoided = 2000 - farm.distance; // Compared to average food miles
  const carbonSavings = (100 - farm.carbonFootprint) * 0.5; // CO2 in kg
  const waterSavings = farm.sustainabilityScore * 5; // Water in gallons
  
  return (
    <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
      <h5 className="font-semibold text-emerald-700 text-sm mb-2">Sustainability Impact</h5>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-emerald-700 mb-1">
            <span>Food Miles Avoided</span>
            <span className="font-medium">{milesAvoided} miles</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div 
              className="bg-emerald-400 h-1.5 rounded-full" 
              style={{ width: `${(milesAvoided/2000) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-emerald-700 mb-1">
            <span>Carbon Reduction</span>
            <span className="font-medium">{carbonSavings.toFixed(1)} kg CO₂</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div 
              className="bg-emerald-400 h-1.5 rounded-full" 
              style={{ width: `${(carbonSavings/50) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-emerald-700 mb-1">
            <span>Water Conservation</span>
            <span className="font-medium">{waterSavings} gallons</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div 
              className="bg-emerald-400 h-1.5 rounded-full" 
              style={{ width: `${(waterSavings/500) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <span className="text-xs text-emerald-600">By choosing ingredients from {farm.name}, each dish saves approximately {(milesAvoided * 0.01 + carbonSavings * 0.1).toFixed(1)} kg of carbon emissions.</span>
      </div>
    </div>
  );
};

// Interactive Cooking Tutorial preview
const CookingTutorialPreview: React.FC<{ingredient: Ingredient}> = ({ ingredient }) => {
  // Generate a recipe suggestion based on ingredient
  const recipes = {
    1: {
      name: "Heirloom Tomato Salad with Basil Oil",
      difficulty: "Easy",
      prepTime: "15 min",
      cookTime: "0 min",
      steps: ["Slice tomatoes", "Add fresh basil and olive oil", "Season with salt and pepper"]
    },
    2: {
      name: "Crispy Baby Kale Chips",
      difficulty: "Easy",
      prepTime: "5 min",
      cookTime: "10 min",
      steps: ["Toss kale with olive oil", "Season with salt and nutritional yeast", "Bake until crispy"]
    },
    3: {
      name: "Garlic Sautéed Shiitake Mushrooms",
      difficulty: "Medium",
      prepTime: "10 min",
      cookTime: "15 min",
      steps: ["Clean mushrooms", "Sauté with garlic and butter", "Finish with fresh herbs"]
    },
    4: {
      name: "Warm Goat Cheese Crostini",
      difficulty: "Easy",
      prepTime: "10 min",
      cookTime: "5 min",
      steps: ["Toast bread slices", "Spread with goat cheese", "Drizzle with honey and thyme"]
    },
    5: {
      name: "Mixed Berry Parfait",
      difficulty: "Easy",
      prepTime: "10 min",
      cookTime: "0 min",
      steps: ["Layer yogurt and berries", "Add granola", "Drizzle with local honey"]
    },
    6: {
      name: "Microgreen and Avocado Toast",
      difficulty: "Easy",
      prepTime: "5 min",
      cookTime: "3 min",
      steps: ["Toast bread", "Mash avocado on toast", "Top with microgreens and flaky salt"]
    }
  };
  
  const recipe = recipes[ingredient.id as keyof typeof recipes];
  
  return (
    <div className="mt-4 p-3 bg-primary-light bg-opacity-5 rounded-lg border border-primary border-opacity-20">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold text-primary-dark text-sm">Cooking Tutorial</h5>
        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">AR Ready</span>
      </div>
      
      <div className="text-sm text-primary-dark font-medium">{recipe.name}</div>
      
      <div className="flex justify-between mt-1 mb-2">
        <span className="text-xs text-neutral-dark">{recipe.difficulty}</span>
        <span className="text-xs text-neutral-dark">Prep: {recipe.prepTime} | Cook: {recipe.cookTime}</span>
      </div>
      
      <div className="space-y-1">
        {recipe.steps.map((step, index) => (
          <div key={index} className="flex items-start text-xs">
            <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-neutral-dark">{step}</span>
          </div>
        ))}
      </div>
      
      <button className="mt-3 w-full text-xs bg-primary text-white rounded-full py-1.5 hover:bg-primary-dark transition-colors">
        Launch AR Cooking Tutorial
      </button>
    </div>
  );
};

const IngredientMap: React.FC = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [hoveredFarm, setHoveredFarm] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'satellite'>('map'); // Default to map view
  const [showConnections, setShowConnections] = useState(true); // Default to showing supply routes
  
  useEffect(() => {
    // Fix Leaflet's icon path issues 
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
    
    // Set map as loaded after a delay to ensure CSS is applied
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFarmSelect = (farm: Farm) => {
    setSelectedFarm(farm);
    setSelectedIngredient(null);
  };
  
  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    const relatedFarm = farms.find(farm => farm.id === ingredient.farmId);
    if (relatedFarm) {
      setSelectedFarm(relatedFarm);
    }
  };
  
  const getIngredientsForFarm = (farmId: number) => {
    return ingredients.filter(i => i.farmId === farmId);
  };
  
  const resetSelection = () => {
    setSelectedFarm(null);
    setSelectedIngredient(null);
  };
  
  // Calculate connections between restaurant and farms
  const getConnectionLines = () => {
    return farms.map(farm => ({
      farm,
      positions: [restaurantLocation, farm.location] as LatLngTuple[],
      color: farm.id === selectedFarm?.id ? '#16a34a' : '#22c55e',
      weight: farm.id === selectedFarm?.id ? 3 : 1.5,
      opacity: farm.id === selectedFarm?.id ? 0.9 : 0.6,
      dashArray: farm.id === selectedFarm?.id ? '' : '5, 10',
    }));
  };
  
  return (
    <section id="ingredient-map" className="py-16 md:py-24 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Ingredient Sourcing Map</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">Discover where every ingredient in our dishes comes from - all sourced within 50 miles of our kitchen</p>
        </motion.div>
        
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button 
            onClick={() => setActiveView('map')}
            className={`px-4 py-1.5 text-sm rounded-full transition ${activeView === 'map' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
          >
            Map View
          </button>
          <button 
            onClick={() => setActiveView('satellite')}
            className={`px-4 py-1.5 text-sm rounded-full transition ${activeView === 'satellite' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
          >
            Satellite View
          </button>
          <button 
            onClick={() => setShowConnections(!showConnections)}
            className={`px-4 py-1.5 text-sm rounded-full transition ${showConnections ? 'bg-primary text-white' : 'bg-white text-primary'}`}
          >
            {showConnections ? 'Hide Supply Routes' : 'Show Supply Routes'}
          </button>
          {selectedFarm && (
            <button 
              onClick={resetSelection}
              className="px-4 py-1.5 text-sm rounded-full bg-secondary text-white transition"
            >
              Reset View
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {mapLoaded && (
              <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
                <MapContainer 
                  center={restaurantLocation} 
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                >
                  {selectedFarm ? (
                    <FlyToMarker position={selectedFarm.location} farmId={selectedFarm.id} />
                  ) : (
                    <FlyToMarker position={restaurantLocation} farmId={null} />
                  )}
                  
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={activeView === 'map' 
                      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    }
                  />
                  
                  {/* Supply chain connections */}
                  {showConnections && getConnectionLines().map((line, index) => (
                    <Polyline
                      key={index}
                      positions={line.positions}
                      pathOptions={{ 
                        color: line.color, 
                        weight: line.weight, 
                        opacity: line.opacity,
                        dashArray: line.dashArray
                      }}
                    />
                  ))}
                  
                  {/* Restaurant Marker */}
                  <Marker position={restaurantLocation} icon={restaurantIcon}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-primary">VivaVeggie Restaurant</h3>
                        <p className="text-sm">Our farm-to-table kitchen in Charlotte</p>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Farm Markers */}
                  {farms.map(farm => (
                    <React.Fragment key={farm.id}>
                      <Marker 
                        position={farm.location} 
                        icon={getFarmIcon(farm.farmType)}
                        eventHandlers={{
                          click: () => handleFarmSelect(farm),
                          mouseover: () => setHoveredFarm(farm.id),
                          mouseout: () => setHoveredFarm(null),
                        }}
                      >
                        <Popup>
                          <div>
                            <h3 className="font-bold text-primary">{farm.name}</h3>
                            <p className="text-sm">{farm.description}</p>
                            <p className="text-xs mt-1">
                              <span className="font-semibold">Distance:</span> {farm.distance} miles
                            </p>
                            <div className="mt-2">
                              <span className="text-xs font-semibold">Key ingredients:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {farm.ingredients.map((ing, idx) => (
                                  <span key={idx} className="bg-primary-light bg-opacity-20 text-primary-dark text-xs px-2 py-1 rounded-full">
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {/* Sustainability radius indicators */}
                      <Circle 
                        center={farm.location}
                        radius={farm.sustainabilityScore * 40} // Scale based on sustainability score
                        pathOptions={{ 
                          fillColor: '#22c55e', 
                          fillOpacity: 0.1, 
                          color: '#22c55e',
                          opacity: hoveredFarm === farm.id || selectedFarm?.id === farm.id ? 0.8 : 0.3,
                          weight: hoveredFarm === farm.id || selectedFarm?.id === farm.id ? 2 : 1
                        }}
                      />
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            )}
            
            {/* Map legend */}
            <div className="mt-3 p-3 bg-white rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold text-primary-dark mb-2">Map Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#ef4444] mr-2"></div>
                  <span className="text-xs">Restaurant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#4ade80] mr-2"></div>
                  <span className="text-xs">Organic Farm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#a78bfa] mr-2"></div>
                  <span className="text-xs">Heritage Farm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#60a5fa] mr-2"></div>
                  <span className="text-xs">Dairy Farm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#f97316] mr-2"></div>
                  <span className="text-xs">Orchard</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#10b981] mr-2"></div>
                  <span className="text-xs">Microgreens</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[650px] overflow-auto">
            {selectedFarm ? (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading text-xl text-primary-dark">{selectedFarm.name}</h3>
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                      {selectedFarm.distance} miles
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-2 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${selectedFarm.sustainabilityScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-primary font-bold">{selectedFarm.sustainabilityScore}</span>
                    <span className="ml-1 text-xs text-neutral-dark">/100</span>
                  </div>
                  
                  <p className="text-neutral-dark text-sm mb-2">{selectedFarm.description}</p>
                  
                  {/* Weather information */}
                  <WeatherDisplay farmLocation={selectedFarm.location} />
                  
                  {/* Seasonal forecast */}
                  <SeasonalForecast ingredients={getIngredientsForFarm(selectedFarm.id)} />
                  
                  {/* Sustainability impact calculator */}
                  <SustainabilityCalculator farm={selectedFarm} />
                  
                  <h4 className="font-heading text-lg text-primary-dark mt-6 mb-3">Sourced Ingredients</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence>
                      {getIngredientsForFarm(selectedFarm.id).map(ingredient => (
                        <motion.div
                          key={ingredient.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedIngredient?.id === ingredient.id ? 'bg-primary bg-opacity-10 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
                          onClick={() => handleIngredientSelect(ingredient)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          layout
                        >
                          <div className="flex items-center">
                            <img 
                              src={ingredient.image} 
                              alt={ingredient.name} 
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = ingredient.fallbackImage;
                              }}
                            />
                            <div className="ml-3">
                              <h5 className="font-medium text-primary-dark">{ingredient.name}</h5>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {ingredient.seasonality.map((season, idx) => (
                                  <span key={idx} className="bg-accent bg-opacity-20 text-secondary-dark text-xs px-2 py-0.5 rounded-full">
                                    {season}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-primary-dark mr-1">Nutrition Score:</span>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                                  <div 
                                    className="bg-primary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.nutritionScore}%` }}
                                  ></div>
                                </div>
                                <span className="ml-1 text-xs text-primary font-semibold">{ingredient.nutritionScore}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {selectedIngredient && (
                  <motion.div 
                    className="mt-6 p-4 bg-primary bg-opacity-5 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <h4 className="font-heading text-lg text-primary-dark mb-2">{selectedIngredient.name}</h4>
                    <p className="text-sm text-neutral-dark mb-3">{selectedIngredient.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="text-xs">
                        <span className="font-semibold">Best seasons: </span>
                        {selectedIngredient.seasonality.join(', ')}
                      </div>
                    </div>
                    
                    {/* Cooking tutorial component */}
                    <CookingTutorialPreview ingredient={selectedIngredient} />
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-primary-dark mb-2">Explore Our Sources</h3>
                <p className="text-neutral-dark mb-4">Click on any farm marker on the map to learn more about our ingredients and sourcing practices.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-primary bg-opacity-5 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-dark text-sm mb-2">Farm-to-Table Stats</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">Local Farms:</span>
                        <span className="font-medium text-primary-dark">{farms.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">Avg. Distance:</span>
                        <span className="font-medium text-primary-dark">
                          {(farms.reduce((acc, farm) => acc + farm.distance, 0) / farms.length).toFixed(1)} miles
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">Avg. Sustainability:</span>
                        <span className="font-medium text-primary-dark">
                          {(farms.reduce((acc, farm) => acc + farm.sustainabilityScore, 0) / farms.length).toFixed(0)}/100
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-secondary bg-opacity-5 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-dark text-sm mb-2">Environmental Impact</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">CO₂ Reduction:</span>
                        <span className="font-medium text-secondary-dark">1.2 tons yearly</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">Water Saved:</span>
                        <span className="font-medium text-secondary-dark">24,500 gallons</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-dark">Land Preserved:</span>
                        <span className="font-medium text-secondary-dark">15+ acres</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-heading text-xl text-primary-dark mb-4">Our Sourcing Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-primary border-opacity-20 rounded-lg bg-primary bg-opacity-5">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-heading text-lg text-primary-dark mb-2">Local First</h4>
              <p className="text-neutral-dark text-sm">We source 90% of our ingredients from within 50 miles of our restaurant, reducing food miles and supporting our local farming community.</p>
            </div>
            
            <div className="p-4 border border-primary border-opacity-20 rounded-lg bg-primary bg-opacity-5">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-heading text-lg text-primary-dark mb-2">Sustainable Practices</h4>
              <p className="text-neutral-dark text-sm">We partner exclusively with farms using regenerative agriculture practices, organic methods, and responsible resource management.</p>
            </div>
            
            <div className="p-4 border border-primary border-opacity-20 rounded-lg bg-primary bg-opacity-5">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-heading text-lg text-primary-dark mb-2">Transparency</h4>
              <p className="text-neutral-dark text-sm">We provide full visibility into our supply chain, including farm practices, harvest dates, and transportation methods for each ingredient we use.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientMap;