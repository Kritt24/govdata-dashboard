import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'enrolment', 'demographic', 'biometric'
  title: text("title").notNull(),
  value: integer("value").notNull(),
  trend: integer("trend").notNull(), // percentage change
  data: jsonb("data").notNull(), // Series data for charts
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertMetricSchema = createInsertSchema(metrics);

export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = z.infer<typeof insertMetricSchema>;

export const ROLES = ["Government Official", "Citizen", "Admin (Demo)"] as const;
export type Role = typeof ROLES[number];
