import Joi from "joi"
import { Prisma } from "@prisma/client";

type PropertyInput = Prisma.PropertyCreateInput | Prisma.PropertyUpdateInput

export const validateProperty = (data: PropertyInput): Joi.ValidationResult<PropertyInput> => {
  const propertySchema: Joi.ObjectSchema<PropertyInput> = Joi.object({
    address: Joi.string().required(),
    price: Joi.number().required(),
    apartmentNumber: Joi.string().required(),
    thumbnail: Joi.string().required(),
    status: Joi.boolean().required()
  })

  return propertySchema.validate(data)
}
