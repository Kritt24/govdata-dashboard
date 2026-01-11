import { db } from "./db";
import { metrics, type Metric, type InsertMetric } from "@shared/schema";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  getMetrics(): Promise<Metric[]>;
  getMetric(id: number): Promise<Metric | undefined>;
  seedMetrics(): Promise<void>;
}

export class MemStorage implements IStorage {
  private _metrics: Map<number, Metric>;

  constructor() {
    this._metrics = new Map();
  }

  async getMetrics(): Promise<Metric[]> {
    return Array.from(this._metrics.values());
  }

  async getMetric(id: number): Promise<Metric | undefined> {
    return this._metrics.get(id);
  }

  async seedMetrics(): Promise<void> {
    if (this._metrics.size > 0) return;

    const dataFiles = [
      "enrolmentData.json",
      "demographicData.json",
      "biometricData.json"
    ];

    for (let i = 0; i < dataFiles.length; i++) {
      try {
        const filePath = path.join(process.cwd(), "server", "data", dataFiles[i]);
        const content = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(content);
        
        const id = i + 1;
        this._metrics.set(id, { 
          ...data, 
          id, 
          lastUpdated: new Date(),
          keyQuestion: data.keyQuestion ?? "",
          insights: data.insights ?? [],
          policyImplications: data.policyImplications ?? ""
        });
      } catch (error) {
        console.error(`Error loading ${dataFiles[i]}:`, error);
      }
    }
  }
}

export const storage = new MemStorage();
