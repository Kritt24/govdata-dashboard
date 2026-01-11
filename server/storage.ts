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
        keyQuestion: "How effectively is the enrolment process reaching remote and underserved populations?",
        insights: [
          "98.5% of the adult population is now enrolled.",
          "Significant growth observed in the northeastern states over the last quarter.",
          "Child enrolment (0-5 years) remains a key focus area for upcoming drives."
        ],
        policyImplications: "Enrolment centers should be prioritized in blocks with less than 90% saturation. Mobile enrolment kits should be deployed for elderly and disabled citizens in rural areas.",
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
        keyQuestion: "What are the primary triggers for demographic updates among urban vs rural citizens?",
        insights: [
          "Address updates constitute 45% of total demographic changes.",
          "Mobile number linking has seen a 15% spike following the launch of new digital services.",
          "Name corrections are most frequent after official marriage registration periods."
        ],
        policyImplications: "Simplify the online address update process by integrating with DigiLocker. Increase awareness about the importance of keeping mobile numbers updated for OTP-based services.",
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
        keyQuestion: "How does age-related biometric decay affect authentication success rates in elderly populations?",
        insights: [
          "Mandatory biometric updates for children (at age 5 and 15) have reached 70% compliance.",
          "Fingerprint authentication success rates are slightly lower in manual labor heavy regions.",
          "Iris scan adoption as an alternative is increasing in specialized service centers."
        ],
        policyImplications: "Introduce 'Face Auth' as a primary non-contact alternative for elderly citizens. Mandate biometric refresh every 10 years for adults to maintain authentication accuracy.",
        data: [
          { name: "Iris", value: 20 },
          { name: "Fingerprint", value: 50 },
          { name: "Photo", value: 30 }
        ]
      }
    ];

    mockMetrics.forEach((m, index) => {
      const id = index + 1;
      this._metrics.set(id, { 
        ...m, 
        id, 
        lastUpdated: new Date(),
        keyQuestion: m.keyQuestion ?? "",
        insights: m.insights ?? [],
        policyImplications: m.policyImplications ?? ""
      });
    });
  }
}

export const storage = new MemStorage();
