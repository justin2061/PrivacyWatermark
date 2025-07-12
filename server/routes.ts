import type { Express } from "express";
import { createServer, type Server } from "http";

// Simplified routes file - no API routes needed for the watermark tool
// Everything runs client-side for privacy and security
export async function registerRoutes(app: Express): Promise<Server> {
  // No routes needed - this is a client-side only application
  // All watermark processing happens in the browser
  
  const httpServer = createServer(app);
  return httpServer;
}