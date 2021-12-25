import type { NextApiRequest, NextApiResponse } from 'next'
import type { Property } from '@prisma/client'
import type { HandlerCtx, NextApiHandlerWithCtx } from '@backend/common/commonHandler'
import { Prisma } from '@prisma/client'
import prismaClient from '@backend/prisma'
import { validateProperty } from '@backend/validators/propertyValidator'
import {
  CannotGetRecordListError,
  CannotGetRecordError,
} from '@backend/common/errors'
import redisClient from '@backend/common/redisClient'


const getPropertiesHandler: NextApiHandlerWithCtx<Property[]> = async (req: NextApiRequest, res: NextApiResponse) => {
  const properties: Property[] = await prismaClient.property.findMany()

  if (!properties) throw new CannotGetRecordListError("property")

  if (req.url) { // cached resp will be expired after 30mins
    redisClient.set(req.url, JSON.stringify(properties), "EX", 60 * 30)
  }

  return res.status(200).json(properties)
}

const getSinglePropertyHandler: NextApiHandlerWithCtx<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query

  const property: Property | null = await prismaClient.property.findUnique({
    where: {
      id: Number(pid)
    }
  })

  if (!property) throw new CannotGetRecordError("property")

  if (req.url && property) { // cached resp will be expired after 30mins
    redisClient.set(req.url, JSON.stringify(property), "EX", 60 * 30)
  }

  return res.status(200).json(property)
}

const createPropertyHandler: NextApiHandlerWithCtx<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
  let propertyInput: Prisma.PropertyCreateInput
  propertyInput = req.body

  const { error } = await validateProperty(propertyInput)

  if (error) throw new Error(error)

  const createdProperty: Property = await prismaClient.property.create({ data: propertyInput })

  if (createdProperty) { // invalidate cache
    redisClient.del('/api/v1/properties')
  }

  return res.status(200).json(createdProperty)
}

const updatePropertyHandler: NextApiHandlerWithCtx<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (updatedProperty) { // invalidate cache
    redisClient.del(`/api/v1/properties/${updatedProperty.id}`)
  }

  return res.status(200).json(updatedProperty)
}

const destroyPropertyHandler: NextApiHandlerWithCtx<Property> = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (destroyedProperty) { // invalidate cache
    redisClient.del(`/api/v1/properties/${destroyedProperty.id}`)
  }

  return res.status(200).json(destroyedProperty)
}

export {
  getPropertiesHandler,
  getSinglePropertyHandler,
  createPropertyHandler,
  updatePropertyHandler,
  destroyPropertyHandler
}
