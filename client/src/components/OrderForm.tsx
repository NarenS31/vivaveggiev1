import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { menuItems } from "../data/menuItems";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {}

const OrderForm: React.FC<OrderFormProps> = () => {
  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const { toast } = useToast();

  // Form setup with validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      orderType: "pickup",
      address: "",
      pickupTime: "",
      dietaryRestrictions: [],
      specialInstructions: "",
    },
  });

  // Watch form values for real-time updates
  const formValues = watch();
  const orderType = watch("orderType");
  const pickupTime = watch("pickupTime");

  // Calculate estimated delivery/pickup time
  useEffect(() => {
    if (pickupTime) {
      const baseTime = orderType === "pickup" ? 20 : 45; // minutes
      const date = new Date(pickupTime);
      date.setMinutes(date.getMinutes() + baseTime);
      setEstimatedTime(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    }
  }, [pickupTime, orderType]);

  // Submit form to API
  const submitOrder = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/orders", {
        ...data,
        items: selectedItems,
        total: calculateTotal(),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setOrderNumber(data.orderNumber);
      setCurrentStep(4);
      setIsSubmitting(false);
      reset();
      setSelectedItems([]);
    },
    onError: (error) => {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description:
          "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: any) => {
    if (currentStep === 3) {
      setIsSubmitting(true);
      submitOrder.mutate(data);
    }
  };

  const handleItemSelect = (item: any) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove item if quantity is less than 1
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      // Update quantity
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step manually
      if (
        !formValues.name ||
        !formValues.email ||
        !formValues.phone ||
        !formValues.pickupTime ||
        (formValues.orderType === "delivery" && !formValues.address)
      ) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 2 && selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one menu item before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  };

  // Motion variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <section id="preorder" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary font-heading text-4xl md:text-5xl font-bold mb-4">
            Pre-Order Your Meal
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-neutral-dark max-w-2xl mx-auto">
            Skip the wait and have your favorite vegetarian dishes ready when
            you arrive
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Progress steps */}
          <div className="flex justify-between bg-green-50 p-4">
            {["Contact Info", "Menu Selection", "Review Order"].map(
              (step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${index + 1 <= currentStep ? "text-green-600" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? "bg-green-600 text-white" : "bg-gray-200"}`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1">{step}</span>
                </div>
              ),
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
                        >
                          ⚠️ {errors.name.message as string}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
                        >
                          ⚠️ {errors.email.message as string}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="Your phone number"
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
                        >
                          ⚠️ {errors.phone.message as string}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Type
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="pickup"
                            {...register("orderType")}
                            defaultChecked
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2">Pickup</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="delivery"
                            {...register("orderType")}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2">Delivery</span>
                        </label>
                      </div>
                    </div>

                    {orderType === "delivery" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          {...register("address")}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                          placeholder="Your delivery address"
                        />
                        {errors.address && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
                          >
                            ⚠️ {errors.address.message as string}
                          </motion.p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {orderType === "pickup"
                          ? "Pickup Time"
                          : "Delivery Time"}
                      </label>
                      <input
                        type="datetime-local"
                        {...register("pickupTime")}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                      {errors.pickupTime && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
                        >
                          ⚠️ {errors.pickupTime.message as string}
                        </motion.p>
                      )}

                      {estimatedTime && (
                        <p className="text-sm text-gray-600 mt-2">
                          Estimated{" "}
                          {orderType === "pickup" ? "pickup" : "delivery"}:{" "}
                          {estimatedTime}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dietary Restrictions
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Gluten-Free",
                          "Nut-Free",
                          "Soy-Free",
                          "No Onions/Garlic",
                        ].map((restriction) => (
                          <label
                            key={restriction}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              value={restriction}
                              {...register("dietaryRestrictions")}
                              className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm">{restriction}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        {...register("specialInstructions")}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="Any specific requests for your order..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                      Next: Select Items
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Menu Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">Select Menu Items</h2>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-3 flex items-center cursor-pointer hover:bg-green-50 transition duration-200"
                        onClick={() => handleItemSelect(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 truncate">
                            {item.description}
                          </p>
                          <p className="text-primary-dark font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemSelect(item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-2">Selected Items</h3>
                    {selectedItems.length === 0 ? (
                      <p className="text-gray-500 italic">No items selected</p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded mr-2"
                              />
                              <span>{item.name}</span>
                            </div>
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="bg-gray-200 h-6 w-6 rounded flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button
                                type="button"
                                className="bg-gray-200 h-6 w-6 rounded flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="ml-4 text-red-500"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                    >
                      Next: Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {formValues.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {formValues.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {formValues.phone}
                      </p>
                      <p>
                        <span className="font-medium">Order Type:</span>{" "}
                        {formValues.orderType === "pickup"
                          ? "Pickup"
                          : "Delivery"}
                      </p>
                      {formValues.orderType === "delivery" && (
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {formValues.address}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(formValues.pickupTime).toLocaleString()}
                      </p>
                      {formValues.dietaryRestrictions &&
                        formValues.dietaryRestrictions.length > 0 && (
                          <p>
                            <span className="font-medium">
                              Dietary Restrictions:
                            </span>{" "}
                            {formValues.dietaryRestrictions.join(", ")}
                          </p>
                        )}
                      {formValues.specialInstructions && (
                        <p>
                          <span className="font-medium">
                            Special Instructions:
                          </span>{" "}
                          {formValues.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    {selectedItems.length === 0 ? (
                      <p className="text-red-500 italic">No items selected</p>
                    ) : (
                      <div className="border rounded">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="py-2 px-4 text-left">Item</th>
                              <th className="py-2 px-4 text-center">
                                Quantity
                              </th>
                              <th className="py-2 px-4 text-right">Price</th>
                              <th className="py-2 px-4 text-right">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedItems.map((item) => (
                              <tr key={item.id} className="border-t">
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4 text-center">
                                  {item.quantity}
                                </td>
                                <td className="py-2 px-4 text-right">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td className="py-2 px-4 text-right">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 font-semibold">
                            <tr className="border-t">
                              <td className="py-2 px-4" colSpan={3}>
                                Total
                              </td>
                              <td className="py-2 px-4 text-right">
                                ${calculateTotal().toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                      disabled={isSubmitting || selectedItems.length === 0}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Order Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-green-600">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-xl mb-4">
                    Your order number is:{" "}
                    <span className="font-bold">{orderNumber}</span>
                  </p>
                  <p className="mb-6">
                    We've sent a confirmation to your email. Please arrive at
                    your scheduled time for pickup.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                  >
                    Place Another Order
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
