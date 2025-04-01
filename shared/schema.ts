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
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  orderType: z.enum(["pickup", "delivery"]),
  address: z.string().optional(),
  pickupTime: z.string().min(1, { message: "Time is required" }),
  dietaryRestrictions: z.array(z.string()).optional(),
  specialInstructions: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
