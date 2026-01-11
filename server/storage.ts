import { db } from "./db";
import { metrics, type Metric, type InsertMetric } from "@shared/schema";
import { eq } from "drizzle-orm";

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

    const mockMetrics: InsertMetric[] = [
      {
        category: "enrolment",
        title: "Aadhaar Enrolment Trends",
        value: 1350000000,
        trend: 2,
        data: [
          { name: "Jan", value: 120 },
          { name: "Feb", value: 132 },
          { name: "Mar", value: 145 },
          { name: "Apr", value: 150 },
          { name: "May", value: 155 },
          { name: "Jun", value: 162 }
        ]
      },
      {
        category: "demographic",
        title: "Demographic Update Insights",
        value: 4500000,
        trend: 5,
        data: [
          { name: "Name Change", value: 35 },
          { name: "Address Change", value: 45 },
          { name: "DOB Change", value: 10 },
          { name: "Mobile Update", value: 10 }
        ]
      },
      {
        category: "biometric",
        title: "Biometric Update Analysis",
        value: 1200000,
        trend: -1,
        data: [
          { name: "Iris", value: 20 },
          { name: "Fingerprint", value: 50 },
          { name: "Photo", value: 30 }
        ]
      }
    ];

    mockMetrics.forEach((m, index) => {
      const id = index + 1;
      this._metrics.set(id, { ...m, id, lastUpdated: new Date() });
    });
  }
}

export const storage = new MemStorage();
