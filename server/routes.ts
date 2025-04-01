import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up routes with /api prefix
  
  // Get menu items
  app.get('/api/menu', (req, res) => {
    res.json({
      success: true,
      data: storage.getMenuItems()
    });
  });

  // Create new order
  app.post('/api/orders', async (req, res) => {
    try {
      // Validate request body
      const orderData = insertOrderSchema.parse(req.body);
      
      // Generate an order number
      const orderNum = `VEG-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Create order with order number
      const order = await storage.createOrder({
        ...orderData,
        orderNumber: orderNum,
        orderDate: new Date(),
      });

      res.status(201).json({
        success: true,
        orderNumber: order.orderNumber,
        message: "Order created successfully",
        data: order
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid order data",
          errors: error.errors
        });
      } else {
        console.error("Error creating order:", error);
        res.status(500).json({
          success: false,
          message: "Error creating order"
        });
      }
    }
  });

  // Get order by order number
  app.get('/api/orders/:orderNumber', async (req, res) => {
    try {
      const orderNumber = req.params.orderNumber;
      const order = await storage.getOrderByNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching order"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
