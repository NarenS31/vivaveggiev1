import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

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
}

// Define ingredient data
interface Ingredient {
  id: number;
  name: string;
  farmId: number;
  image: string;
  description: string;
  seasonality: string[];
}

// Sample data for our farms
const farms: Farm[] = [
  {
    id: 1,
    name: "Green Valley Organics",
    location: [35.2271, -80.8431], // Approximate coordinates near Charlotte
    ingredients: ["Tomatoes", "Lettuce", "Carrots", "Kale"],
    distance: 12,
    description: "Family-owned organic farm focused on sustainable growing practices.",
    sustainabilityScore: 95
  },
  {
    id: 2,
    name: "Carolina Heritage Farms",
    location: [35.2501, -80.7801], // Another location near Charlotte
    ingredients: ["Mushrooms", "Herbs", "Edible Flowers"],
    distance: 8,
    description: "Specializing in heirloom varieties and rare herbs using natural growing methods.",
    sustainabilityScore: 92
  },
  {
    id: 3,
    name: "Harmony Valley Dairy",
    location: [35.1875, -80.8031], // Another location near Charlotte
    ingredients: ["Cheese", "Milk", "Butter"],
    distance: 15,
    description: "Animal welfare certified dairy producing small-batch artisanal cheeses and dairy products.",
    sustainabilityScore: 89
  },
  {
    id: 4,
    name: "Sunrise Orchards",
    location: [35.2671, -80.9031], // Another location near Charlotte
    ingredients: ["Apples", "Berries", "Stone Fruits"],
    distance: 18,
    description: "Multi-generational orchard using integrated pest management and pollinator-friendly practices.",
    sustainabilityScore: 88
  },
  {
    id: 5,
    name: "Wild Earth Microgreens",
    location: [35.1971, -80.7631], // Another location near Charlotte
    ingredients: ["Microgreens", "Sprouts", "Specialty Greens"],
    distance: 5,
    description: "Urban vertical farm growing nutrient-dense microgreens using 95% less water than conventional farming.",
    sustainabilityScore: 98
  }
];

// Sample ingredients data
const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    farmId: 1,
    image: "https://images.unsplash.com/photo-1582284540246-9726ba4a4a56?w=250&h=250&fit=crop",
    description: "Organically grown, vine-ripened heirloom tomatoes with rich flavor profiles.",
    seasonality: ["Summer", "Early Fall"]
  },
  {
    id: 2,
    name: "Baby Kale",
    farmId: 1,
    image: "https://images.unsplash.com/photo-1515686413624-53f6f5aefb38?w=250&h=250&fit=crop",
    description: "Tender young kale leaves harvested for optimal nutrition and mild flavor.",
    seasonality: ["Spring", "Fall"]
  },
  {
    id: 3,
    name: "Shiitake Mushrooms",
    farmId: 2,
    image: "https://images.unsplash.com/photo-1504674641010-472d2f845079?w=250&h=250&fit=crop",
    description: "Forest-grown shiitake mushrooms cultivated on fallen oak logs.",
    seasonality: ["Year-round"]
  },
  {
    id: 4,
    name: "Artisanal Goat Cheese",
    farmId: 3,
    image: "https://images.unsplash.com/photo-1552767080-9f3bf8123af2?w=250&h=250&fit=crop",
    description: "Small-batch goat cheese made from the milk of pasture-raised goats.",
    seasonality: ["Year-round"]
  },
  {
    id: 5,
    name: "Mixed Berry Blend",
    farmId: 4,
    image: "https://images.unsplash.com/photo-1563746924237-f81951d2cdf8?w=250&h=250&fit=crop",
    description: "Seasonal mix of blackberries, blueberries, and raspberries.",
    seasonality: ["Summer"]
  },
  {
    id: 6, 
    name: "Sunflower Microgreens",
    farmId: 5,
    image: "https://images.unsplash.com/photo-1535915087683-3bed29b9afb0?w=250&h=250&fit=crop",
    description: "Nutrient-dense microgreens with nutty flavor profile.",
    seasonality: ["Year-round"]
  }
];

// Create custom icon
const customIcon = new Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const IngredientMap: React.FC = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [hoveredFarm, setHoveredFarm] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Charlotte, NC as the center point
  const center: LatLngTuple = [35.2271, -80.8431];
  
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
  
  return (
    <section id="ingredient-map" className="py-16 md:py-24 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Ingredient Sourcing Map</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">Discover where every ingredient in our dishes comes from - all sourced within 50 miles of our kitchen</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {mapLoaded && (
              <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
                <MapContainer 
                  center={center} 
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Restaurant Marker */}
                  <Marker position={center}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-primary">VivaVeggie Restaurant</h3>
                        <p className="text-sm">Our farm-to-table kitchen</p>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Farm Markers */}
                  {farms.map(farm => (
                    <React.Fragment key={farm.id}>
                      <Marker 
                        position={farm.location} 
                        icon={customIcon}
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
                        radius={farm.sustainabilityScore * 50} // Scale based on sustainability score
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
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] overflow-auto">
            {selectedFarm ? (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-heading text-xl text-primary-dark mb-2">{selectedFarm.name}</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${selectedFarm.sustainabilityScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-primary font-bold">{selectedFarm.sustainabilityScore}</span>
                  </div>
                  <p className="text-neutral-dark text-sm mb-4">{selectedFarm.description}</p>
                  <p className="text-sm mb-6">
                    <span className="font-semibold">Distance:</span> {selectedFarm.distance} miles from our kitchen
                  </p>
                  
                  <h4 className="font-heading text-lg text-primary-dark mb-3">Sourced Ingredients</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getIngredientsForFarm(selectedFarm.id).map(ingredient => (
                      <motion.div
                        key={ingredient.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedIngredient?.id === ingredient.id ? 'bg-primary bg-opacity-10 shadow-md' : 'bg-gray-50 hover:bg-gray-100'}`}
                        onClick={() => handleIngredientSelect(ingredient)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <img 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
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
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {selectedIngredient && (
                  <motion.div 
                    className="mt-6 p-4 bg-primary bg-opacity-5 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-heading text-lg text-primary-dark mb-2">{selectedIngredient.name}</h4>
                    <p className="text-sm text-neutral-dark mb-3">{selectedIngredient.description}</p>
                    <div className="flex items-center">
                      <div className="text-xs">
                        <span className="font-semibold">Best seasons: </span>
                        {selectedIngredient.seasonality.join(', ')}
                      </div>
                    </div>
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
                <p className="text-neutral-dark">Click on any farm marker on the map to learn more about our ingredients and sourcing practices.</p>
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