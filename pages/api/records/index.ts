import type { NextApiRequest, NextApiResponse } from 'next'
import { storage } from '@/lib/storage'
import { insertRecordSchema } from '@/shared/schema'
import { z } from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const { search, status, category } = req.query
        
        let records
        
        if (search) {
          records = await storage.searchRecords(search as string)
        } else if (status || category) {
          records = await storage.filterRecords({
            status: status as string,
            category: category as string,
          })
        } else {
          records = await storage.getAllRecords()
        }
        
        res.status(200).json(records)
        break
      }
      
      case 'POST': {
        try {
          const validatedData = insertRecordSchema.parse(req.body)
          const record = await storage.createRecord(validatedData)
          res.status(201).json(record)
        } catch (error) {
          if (error instanceof z.ZodError) {
            return res.status(400).json({
              message: 'Validation error',
              errors: error.errors
            })
          }
          throw error
        }
        break
      }
      
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}