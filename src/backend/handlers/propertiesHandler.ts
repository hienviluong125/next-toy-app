import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

const getPropertiesHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Properties Index Api")
}

const getSinglePropertyHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Get Detail Of Property Api")
}

const createPropertyHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Create Property Api")
}

const updatePropertyHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Update Property Api")
}

const destroyPropertyHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("Destroy Property Api")
}

export {
  getPropertiesHandler,
  getSinglePropertyHandler,
  createPropertyHandler,
  updatePropertyHandler,
  destroyPropertyHandler
}
