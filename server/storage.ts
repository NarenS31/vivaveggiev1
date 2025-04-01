import { users, type User, type InsertUser, orders, type Order, type InsertOrder, type MenuItem, menuItemSchema } from "@shared/schema";
import { menuItems as defaultMenuItems } from "../client/src/data/menuItems";

// Interface for storage methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Order methods
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Menu items
  getMenuItems(): MenuItem[];
}

// In-memory storage implementation
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

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Order methods
  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return this.orders.get(orderNumber);
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    // Ensure order has all required fields
    const newOrder: Order = {
      id: this.orders.size + 1,
      orderDate: new Date(),
      ...order,
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

export const storage = new MemStorage();
