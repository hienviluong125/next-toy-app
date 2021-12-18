import type { NextApiRequest, NextApiResponse } from 'next'
import { getSinglePropertyHandler, updatePropertyHandler, destroyPropertyHandler } from '@backend/handlers/propertiesHandler'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getSinglePropertyHandler(req, res)
  } else if (req.method === "PUT" || req.method === "PATCH") {
    updatePropertyHandler(req, res)
  } else if (req.method === "DELETE") {
    destroyPropertyHandler(req, res)
  } else {
    res.status(400).json("Method not allowed")
  }
}
