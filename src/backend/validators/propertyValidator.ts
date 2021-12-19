import { object, string, number } from 'yup';
import { Prisma } from "@prisma/client";

type PropertyInput = Prisma.PropertyCreateInput | Prisma.PropertyUpdateInput

export const validateProperty = (data: PropertyInput): Promise<{ data: PropertyInput | null, error: string | null }> => {
  const propertyInputSchema = object().shape({
    address: string().required(),
    apartmentNumber: string().required(),
    price: number().required(),
    thumbnail: string().url().required(),
  })

  return propertyInputSchema.validate(data, {
    strict: true,
    stripUnknown: true,
    abortEarly: false,
  })
    .then(() => {
      return { data: propertyInputSchema.cast(data), error: null }
    }).catch(err => {
      return { data: null, error: err.errors.join(", ") }
    })
}
