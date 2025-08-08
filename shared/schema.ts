import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const records = pgTable("records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertRecordSchema = createInsertSchema(records).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateRecordSchema = insertRecordSchema.partial();

export type InsertRecord = z.infer<typeof insertRecordSchema>;
export type UpdateRecord = z.infer<typeof updateRecordSchema>;
export type Record = typeof records.$inferSelect;