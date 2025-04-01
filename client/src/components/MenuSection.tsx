import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems as allMenuItems } from '../data/menuItems';
import { useToast } from '@/hooks/use-toast';

const MenuSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [dietaryFilters, setDietaryFilters] = useState<{[key: string]: boolean}>({
    vegan: false,
    glutenFree: false,
    nutFree: false
  });
  const [filteredItems, setFilteredItems] = useState(allMenuItems);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const { toast } = useToast();

  // Apply filters when activeFilter or dietaryFilters change
  useEffect(() => {
    let result = allMenuItems;

    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(item => item.category.toLowerCase() === activeFilter);
    }

    // Apply dietary filters
    if (dietaryFilters.vegan) {
      result = result.filter(item => item.tags.includes('Vegan'));
    }
    if (dietaryFilters.glutenFree) {
      result = result.filter(item => item.tags.includes('Gluten-Free'));
    }
    if (dietaryFilters.nutFree) {
      result = result.filter(item => item.tags.includes('Nut-Free'));
    }

    setFilteredItems(result);
  }, [activeFilter, dietaryFilters]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleDietary = (filter: string) => {
    setDietaryFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const addToOrder = (item: any) => {
    // Check if item already exists in order
    const existingItemIndex = orderItems.findIndex(i => i.id === item.id);

    if (existingItemIndex !== -1) {
      // Update quantity
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      // Add new item with quantity 1
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }

    toast({
      title: "Added to order",
      description: `${item.name} has been added to your order.`,
      duration: 2000
    });
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">Our Seasonal Menu</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">Fresh, local ingredients transformed into delicious plant-based creations</p>
        </motion.div>

        {/* Menu Filter */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
            onClick={() => handleFilterChange('all')}
          >
            All Items
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${activeFilter === 'starters' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
            onClick={() => handleFilterChange('starters')}
          >
            Starters
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${activeFilter === 'mains' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
            onClick={() => handleFilterChange('mains')}
          >
            Main Courses
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${activeFilter === 'desserts' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
            onClick={() => handleFilterChange('desserts')}
          >
            Desserts
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${activeFilter === 'drinks' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
            onClick={() => handleFilterChange('drinks')}
          >
            Drinks
          </button>
        </div>

        <div className="flex flex-wrap justify-center mb-6 gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs text-primary border border-primary">
            <input 
              type="checkbox" 
              className="mr-1" 
              id="filter-vegan"
              checked={dietaryFilters.vegan}
              onChange={() => toggleDietary('vegan')}
            />
            <label htmlFor="filter-vegan">Vegan</label>
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs text-primary border border-primary">
            <input 
              type="checkbox" 
              className="mr-1" 
              id="filter-glutenfree"
              checked={dietaryFilters.glutenFree}
              onChange={() => toggleDietary('glutenFree')}
            />
            <label htmlFor="filter-glutenfree">Gluten-Free</label>
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs text-primary border border-primary">
            <input 
              type="checkbox" 
              className="mr-1" 
              id="filter-nutfree"
              checked={dietaryFilters.nutFree}
              onChange={() => toggleDietary('nutFree')}
            />
            <label htmlFor="filter-nutfree">Nut-Free</label>
          </span>
        </div>

        {/* Menu Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ 
                  y: -15, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  scale: 1.03,
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 blur-xl group-hover:animate-shine"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-xl text-primary-dark">{item.name}</h3>
                    <span className="font-semibold text-secondary">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-neutral-dark text-sm mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-primary-light bg-opacity-20 text-primary-dark text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button 
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded transition duration-300 relative overflow-hidden group"
                    onClick={() => addToOrder(item)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Add to Order</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine"></span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-dark text-lg">No items match your selected filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;