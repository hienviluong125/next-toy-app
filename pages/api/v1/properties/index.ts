import type { NextApiRequest, NextApiResponse } from 'next'
import { getPropertiesHandler, createPropertyHandler } from '@backend/handlers/propertiesHandler'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getPropertiesHandler(req, res)
  } else if (req.method === "POST") {
    createPropertyHandler(req, res)
  } else {
    res.status(400).json("Method not allowed")
  }
}
