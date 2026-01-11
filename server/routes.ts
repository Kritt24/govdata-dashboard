import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await storage.seedMetrics();

  app.get(api.metrics.list.path, async (req, res) => {
    const metrics = await storage.getMetrics();
    res.json(metrics);
  });

  app.get(api.metrics.get.path, async (req, res) => {
    const metric = await storage.getMetric(Number(req.params.id));
    if (!metric) {
      return res.status(404).json({ message: 'Metric not found' });
    }
    res.json(metric);
  });

  return httpServer;
}
