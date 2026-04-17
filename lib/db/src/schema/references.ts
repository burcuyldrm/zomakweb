import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const referencesTable = pgTable("client_references", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull().default(""),
  project: text("project").notNull().default(""),
  location: text("location").notNull().default(""),
  year: text("year").notNull().default(""),
  logoUrl: text("logo_url").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertReferenceSchema = createInsertSchema(referencesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertReference = z.infer<typeof insertReferenceSchema>;
export type Reference = typeof referencesTable.$inferSelect;
