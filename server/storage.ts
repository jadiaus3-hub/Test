import { type Record, type InsertRecord, type UpdateRecord } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<Record | undefined>;
  getUserByUsername(username: string): Promise<Record | undefined>;
  createUser(user: any): Promise<Record>;
  
  // Records CRUD operations
  getAllRecords(): Promise<Record[]>;
  getRecord(id: string): Promise<Record | undefined>;
  createRecord(record: InsertRecord): Promise<Record>;
  updateRecord(id: string, record: UpdateRecord): Promise<Record | undefined>;
  deleteRecord(id: string): Promise<boolean>;
  searchRecords(query: string): Promise<Record[]>;
  filterRecords(filters: { status?: string; category?: string }): Promise<Record[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, Record>;
  private records: Map<string, Record>;

  constructor() {
    this.users = new Map();
    this.records = new Map();
  }

  async getUser(id: string): Promise<Record | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<Record | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<Record> {
    const id = randomUUID();
    const user: Record = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllRecords(): Promise<Record[]> {
    return Array.from(this.records.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getRecord(id: string): Promise<Record | undefined> {
    return this.records.get(id);
  }

  async createRecord(insertRecord: InsertRecord): Promise<Record> {
    const id = randomUUID();
    const now = new Date();
    const record: Record = {
      ...insertRecord,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.records.set(id, record);
    return record;
  }

  async updateRecord(id: string, updateRecord: UpdateRecord): Promise<Record | undefined> {
    const existingRecord = this.records.get(id);
    if (!existingRecord) {
      return undefined;
    }

    const updatedRecord: Record = {
      ...existingRecord,
      ...updateRecord,
      updatedAt: new Date(),
    };
    this.records.set(id, updatedRecord);
    return updatedRecord;
  }

  async deleteRecord(id: string): Promise<boolean> {
    return this.records.delete(id);
  }

  async searchRecords(query: string): Promise<Record[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.records.values()).filter(record =>
      record.name.toLowerCase().includes(lowerQuery) ||
      record.description?.toLowerCase().includes(lowerQuery) ||
      record.category.toLowerCase().includes(lowerQuery)
    );
  }

  async filterRecords(filters: { status?: string; category?: string }): Promise<Record[]> {
    return Array.from(this.records.values()).filter(record => {
      if (filters.status && record.status !== filters.status) {
        return false;
      }
      if (filters.category && record.category !== filters.category) {
        return false;
      }
      return true;
    });
  }
}

export const storage = new MemStorage();
