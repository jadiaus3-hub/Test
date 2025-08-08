import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRecordSchema, updateRecordSchema } from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all records
  app.get("/api/records", async (req, res) => {
    try {
      const { search, status, category } = req.query;
      
      let records;
      
      if (search) {
        records = await storage.searchRecords(search as string);
      } else if (status || category) {
        records = await storage.filterRecords({
          status: status as string,
          category: category as string,
        });
      } else {
        records = await storage.getAllRecords();
      }
      
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch records" });
    }
  });

  // Get single record
  app.get("/api/records/:id", async (req, res) => {
    try {
      const record = await storage.getRecord(req.params.id);
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch record" });
    }
  });

  // Create new record
  app.post("/api/records", async (req, res) => {
    try {
      const validatedData = insertRecordSchema.parse(req.body);
      const record = await storage.createRecord(validatedData);
      res.status(201).json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create record" });
    }
  });

  // Update record
  app.put("/api/records/:id", async (req, res) => {
    try {
      const validatedData = updateRecordSchema.parse(req.body);
      const record = await storage.updateRecord(req.params.id, validatedData);
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update record" });
    }
  });

  // Delete record
  app.delete("/api/records/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteRecord(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete record" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
