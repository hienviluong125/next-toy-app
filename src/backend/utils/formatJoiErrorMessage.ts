import Joi from 'joi'

export const formatJoiErrorMessage = (error: Joi.ValidationError): string => {
  return error.details.map(errorField => errorField.message).join(", ")
}
