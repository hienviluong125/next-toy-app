import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import type { Property } from '@prisma/client'
import { Prisma } from '@prisma/client'
import prismaClient from '@backend/prisma'
import { validateProperty } from '@backend/validators/propertyValidator'
import {
  CannotGetRecordListError,
  CannotGetRecordError,
} from '@backend/common/errors'

const getPropertiesHandler: NextApiHandler<Property[]> = async (req: NextApiRequest, res: NextApiResponse) => {
  const properties: Property[] = await prismaClient.property.findMany()

  if (!properties) throw new CannotGetRecordListError("property")

  return res.status(200).json(properties)
}

const getSinglePropertyHandler: NextApiHandler<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query

  const property: Property | null = await prismaClient.property.findUnique({
    where: {
      id: Number(pid)
    }
  })

  if (!property) throw new CannotGetRecordError("property")

  return res.status(200).json(property)
}

const createPropertyHandler: NextApiHandler<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
  let propertyInput: Prisma.PropertyCreateInput
  propertyInput = req.body

  const { error } = await validateProperty(propertyInput)

  if (error) throw new Error(error)

  const createdProperty: Property = await prismaClient.property.create({ data: propertyInput })

  return res.status(200).json(createdProperty)
}

const updatePropertyHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query
  let propertyUpdateInput: Prisma.PropertyUpdateInput
  propertyUpdateInput = req.body

  const property: Property | null = await prismaClient.property.findUnique({
    where: {
      id: Number(pid)
    }
  })

  if (!property) throw new CannotGetRecordError("property")

  const { error } = await validateProperty(propertyUpdateInput)

  if (error) throw new Error(error)

  const updatedProperty: Property = await prismaClient.property.update({
    where: {
      id: Number(pid)
    },
    data: propertyUpdateInput
  })

  return res.status(200).json(updatedProperty)
}

const destroyPropertyHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query
  const property: Property | null = await prismaClient.property.findUnique({
    where: {
      id: Number(pid)
    }
  })

  if (!property) throw new CannotGetRecordError("property")

  const destroyedProperty = await prismaClient.property.delete({
    where: {
      id: Number(pid)
    }
  })

  return res.status(200).json(destroyedProperty)
}

export {
  getPropertiesHandler,
  getSinglePropertyHandler,
  createPropertyHandler,
  updatePropertyHandler,
  destroyPropertyHandler
}
