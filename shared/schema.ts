import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Orders schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  orderType: text("order_type").notNull(), // pickup or delivery
  address: text("address"),
  pickupTime: text("pickup_time").notNull(),
  dietaryRestrictions: text("dietary_restrictions").array(),
  specialInstructions: text("special_instructions"),
  items: json("items").notNull(),
  total: integer("total").notNull(),
  orderNumber: text("order_number").notNull().unique(),
  orderDate: timestamp("order_date").notNull().defaultNow(),
  estimatedTime: text("estimated_time"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderDate: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Menu item schema (for the frontend data)
export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

// Form schemas
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string()
    .min(5, { message: "Email is too short" })
    .max(100, { message: "Email is too long" })
    .refine(val => val.includes('@'), {
      message: "Email must contain an '@' symbol"
    })
    .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email format (user@example.com)"
    }),
  phone: z.string()
    .refine(val => /^\d{10}$/.test(val.replace(/\D/g, '')), {
      message: "Phone number must contain exactly 10 digits"
    })
    .refine(val => /^[\d\+\-\(\)\s]+$/.test(val), {
      message: "Phone number can only contain digits, spaces, and +()-"
    }),
  orderType: z.enum(["pickup", "delivery"], { 
    errorMap: () => ({ message: "Please select a valid order type" }) 
  }),
  address: z.string()
    .min(1, { message: "Address is required for delivery orders" })
    .optional()
    .refine((val) => val !== undefined && val.length > 0, { 
      message: "Address is required for delivery orders" 
    }),
  pickupTime: z.string()
    .min(1, { message: "Please select a pickup/delivery time" })
    .refine(val => new Date(val) > new Date(), {
      message: "Pickup/delivery time must be in the future"  
    }),
  dietaryRestrictions: z.array(z.string()).optional(),
  specialInstructions: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
