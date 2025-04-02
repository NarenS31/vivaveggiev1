import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreOrderForm = ({ menuItems = [] }) => {
  // Provide default menu items for the demo
  const defaultMenuItems = menuItems.length ? menuItems : [
    {
      id: 1,
      name: "Buddha Bowl",
      price: 14.99,
      description: "Fresh seasonal vegetables, avocado, quinoa, and tofu with tahini dressing",
      image: "/api/placeholder/300/200",
      tags: ["Vegan", "Gluten-Free"]
    },
    {
      id: 2,
      name: "Mushroom Risotto",
      price: 16.99,
      description: "Creamy arborio rice with wild mushrooms, white wine, and parmesan",
      image: "/api/placeholder/300/200",
      tags: ["Vegetarian"]
    },
    {
      id: 3,
      name: "Chickpea Curry",
      price: 13.99,
      description: "Hearty chickpeas in a spiced tomato and coconut curry sauce",
      image: "/api/placeholder/300/200",
      tags: ["Vegan", "Gluten-Free"]
    },
    {
      id: 4,
      name: "Eggplant Parmesan",
      price: 15.99,
      description: "Layers of baked eggplant with house marinara and melted plant-based cheese",
      image: "/api/placeholder/300/200",
      tags: ["Vegetarian"]
    }
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup',
    address: '',
    pickupTime: '',
    dietaryRestrictions: [],
    specialInstructions: ''
  });
  
  // Form validation
  const [errors, setErrors] = useState({});

  // Calculate estimated time based on order type and selected time
  useEffect(() => {
    if (formData.pickupTime && formData.orderType) {
      const baseTime = formData.orderType === 'pickup' ? 20 : 45; // minutes
      const date = new Date(formData.pickupTime);
      date.setMinutes(date.getMinutes() + baseTime);
      setEstimatedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [formData.pickupTime, formData.orderType]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    // Validate pickup time
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Time is required';
    } else {
      const selectedTime = new Date(formData.pickupTime);
      if (selectedTime < new Date()) {
        newErrors.pickupTime = 'Time must be in the future';
      }
    }
    
    // Validate address for delivery
    if (formData.orderType === 'delivery' && !formData.address) {
      newErrors.address = 'Address is required for delivery';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          dietaryRestrictions: [...prev.dietaryRestrictions, value]
        };
      } else {
        return {
          ...prev,
          dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== value)
        };
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        // Create order number
        const orderNum = `VEG-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderNumber(orderNum);
        
        // In a real app, you would submit this to your API
        console.log('Order submitted:', {
          ...formData,
          items: selectedItems,
          total: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          orderDate: new Date(),
          estimatedTime,
          orderNumber: orderNum
        });
        
        setIsSubmitting(false);
        setCurrentStep(4);
      }, 1500);
    }
  };
  
  const handleItemSelect = (item) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };
  
  const handleItemRemove = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setSelectedItems(selectedItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Progress steps */}
      <div className="flex justify-between bg-green-50 p-4">
        {['Contact Info', 'Menu Selection', 'Review Order'].map((step, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center ${index + 1 <= currentStep ? 'text-green-600' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
              {index + 1}
            </div>
            <span className="text-xs mt-1">{step}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="orderType"
                        value="pickup"
                        checked={formData.orderType === 'pickup'}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2">Pickup</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="orderType"
                        value="delivery"
                        checked={formData.orderType === 'delivery'}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2">Delivery</span>
                    </label>
                  </div>
                </div>
                
                {formData.orderType === 'delivery' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                      placeholder="Your delivery address"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.orderType === 'pickup' ? 'Pickup Time' : 'Delivery Time'}
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
                  
                  {estimatedTime && (
                    <p className="text-sm text-gray-600 mt-2">
                      Estimated {formData.orderType === 'pickup' ? 'pickup' : 'delivery'}: {estimatedTime}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Restrictions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Gluten-Free', 'Nut-Free', 'Soy-Free', 'No Onions/Garlic'].map((restriction) => (
                      <label key={restriction} className="flex items-center">
                        <input
                          type="checkbox"
                          name="dietaryRestrictions"
                          value={restriction}
                          checked={formData.dietaryRestrictions.includes(restriction)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm">{restriction}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) {
                      setCurrentStep(2);
                    }
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Continue to Menu
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Menu Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Select Menu Items</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {defaultMenuItems.map(item => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="h-40 bg-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold">{item.name}</h3>
                        <span className="text-green-600 font-semibold">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center mt-2">
                        {item.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Selected items */}
              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Your Order ({selectedItems.length} items)</h3>
                
                {selectedItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items selected yet. Click on menu items to add them.</p>
                ) : (
                  <ul className="divide-y">
                    {selectedItems.map(item => (
                      <li key={item.id} className="py-2 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            type="button"
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.id, item.quantity - 1);
                            }}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            type="button"
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.id, item.quantity + 1);
                            }}
                          >
                            +
                          </button>
                          <button 
                            type="button"
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemRemove(item.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                
                {selectedItems.length > 0 && (
                  <div className="mt-4 text-right">
                    <p className="font-bold">
                      Total: ${selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={selectedItems.length === 0}
                  className={`px-4 py-2 rounded transition-colors ${
                    selectedItems.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Review Order
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Order Review */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-sm text-gray-700 uppercase mb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p>{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Type</p>
                    <p className="capitalize">{formData.orderType}</p>
                  </div>
                  {formData.orderType === 'delivery' && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Delivery Address</p>
                      <p>{formData.address}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-gray-500">
                      {formData.orderType === 'pickup' ? 'Pickup Time' : 'Delivery Time'}
                    </p>
                    <p>
                      {formData.pickupTime && new Date(formData.pickupTime).toLocaleString()}
                      {estimatedTime && ` (Est. ${formData.orderType}: ${estimatedTime})`}
                    </p>
                  </div>
                  {formData.dietaryRestrictions?.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Dietary Restrictions</p>
                      <p>{formData.dietaryRestrictions.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-sm text-gray-700 uppercase mb-2">Order Items</h3>
                <ul className="divide-y border-t border-b">
                  {selectedItems.map(item => (
                    <li key={item.id} className="py-3 flex justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 mx-2">×</span>
                        <span>{item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 text-right">
                  <p className="text-lg font-bold">
                    Total: ${selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                  rows="3"
                  placeholder="Any special requests or notes for your order..."
                />
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Back to Menu
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully. A confirmation has been sent to your email.
              </p>
              
              <div className="bg-gray-50 p-4 rounded inline-block mx-auto text-left">
                <p className="font-medium">Order Details:</p>
                <p className="text-sm mt-1">
                  {formData.orderType === 'pickup' ? 'Pickup' : 'Delivery'} Time: {estimatedTime}
                </p>
                <p className="text-sm mt-1">
                  Order Number: {orderNumber}
                </p>
              </div>
              
              <div className="mt-8">
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                  onClick={() => {
                    // Reset form and return to homepage
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      orderType: 'pickup',
                      address: '',
                      pickupTime: '',
                      dietaryRestrictions: [],
                      specialInstructions: ''
                    });
                    setSelectedItems([]);
                    setCurrentStep(1);
                  }}
                >
                  Return to Homepage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default PreOrderForm;
