import { eq } from "drizzle-orm";
import { users, type User, type InsertUser, type Order, type InsertOrder, type MenuItem, menuItemSchema } from "@shared/schema";
import { menuItems as defaultMenuItems } from "../client/src/data/menuItems";
//import { db } from "./db"; // Removed database import
import { menuItems } from "../client/src/data/menuItems";

// Interface for storage methods
export interface IStorage {
  // User methods - Removed user methods
  //getUser(id: number): Promise<User | undefined>;
  //getUserByUsername(username: string): Promise<User | undefined>;
  //createUser(user: InsertUser): Promise<User>;

  // Order methods
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;

  // Menu items
  getMenuItems(): MenuItem[];
}

// In-memory storage implementation (kept for reference, but largely unused now)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<string, Order>; // orderNumber -> Order
  private menuItems: MenuItem[];
  private userId: number;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.menuItems = defaultMenuItems;
    this.userId = 1;
  }

  // User methods - Removed user methods
  //async getUser(id: number): Promise<User | undefined> {
  //  return this.users.get(id);
  //}

  //async getUserByUsername(username: string): Promise<User | undefined> {
  //  return Array.from(this.users.values()).find(
  //    (user) => user.username === username,
  //  );
  //}

  //async createUser(insertUser: InsertUser): Promise<User> {
  //  const id = this.userId++;
  //  const user: User = { ...insertUser, id };
  //  this.users.set(id, user);
  //  return user;
  //}

  // Order methods - Replaced with in-memory implementation
  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return this.orders.get(orderNumber);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    // Convert any undefined values to null for DB compatibility
    const sanitizedOrder: InsertOrder = {
      ...order,
      address: order.address || null,
      dietaryRestrictions: order.dietaryRestrictions || null,
      specialInstructions: order.specialInstructions || null,
      estimatedTime: order.estimatedTime || null
    };

    // Ensure order has all required fields with proper null handling
    const newOrder: Order = {
      id: this.orders.size + 1,
      orderDate: new Date(),
      name: sanitizedOrder.name,
      email: sanitizedOrder.email,
      phone: sanitizedOrder.phone,
      orderType: sanitizedOrder.orderType,
      pickupTime: sanitizedOrder.pickupTime,
      address: sanitizedOrder.address as string | null,
      dietaryRestrictions: sanitizedOrder.dietaryRestrictions as string[] | null,
      specialInstructions: sanitizedOrder.specialInstructions as string | null,
      items: sanitizedOrder.items,
      total: sanitizedOrder.total,
      orderNumber: sanitizedOrder.orderNumber,
      estimatedTime: sanitizedOrder.estimatedTime as string | null
    };

    // Store order by orderNumber for fast lookup
    this.orders.set(order.orderNumber, newOrder);

    return newOrder;
  }

  // Menu items
  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}

// PostgreSQL storage implementation - Removed
//export class PgStorage implements IStorage { ... }

// Use the in-memory storage implementation for now
const ordersInMemory = new Map(); //This line added to match edited code

export const storage = {
  getMenuItems: () => menuItems,
  createOrder: async (orderData: any) => {
    const order = {
      ...orderData,
      id: Date.now().toString()
    };
    ordersInMemory.set(order.orderNumber, order);
    return order;
  },
  getOrderByNumber: async (orderNumber: string) => {
    return ordersInMemory.get(orderNumber) || null;
  }
};