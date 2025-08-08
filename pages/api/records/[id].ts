import type { NextApiRequest, NextApiResponse } from 'next'
import { storage } from '@/lib/storage'
import { updateRecordSchema } from '@/shared/schema'
import { z } from 'zod'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid record ID' })
  }

  try {
    switch (req.method) {
      case 'GET': {
        const record = await storage.getRecord(id)
        if (!record) {
          return res.status(404).json({ message: 'Record not found' })
        }
        res.status(200).json(record)
        break
      }
      
      case 'PUT': {
        try {
          const validatedData = updateRecordSchema.parse(req.body)
          const record = await storage.updateRecord(id, validatedData)
          if (!record) {
            return res.status(404).json({ message: 'Record not found' })
          }
          res.status(200).json(record)
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
      
      case 'DELETE': {
        const deleted = await storage.deleteRecord(id)
        if (!deleted) {
          return res.status(404).json({ message: 'Record not found' })
        }
        res.status(204).end()
        break
      }
      
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}