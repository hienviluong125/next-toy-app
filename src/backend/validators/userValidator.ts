import { object, string } from 'yup';

export type CredentialsInput = {
  email: string
  password: string
}

export type RegistrationInput = {
  email: string
  password: string
  name?: string
}

export const validateCrendetials = (data: CredentialsInput): Promise<{ data: CredentialsInput | null, error: string | null }> => {
  const credentialsInputSchema = object().shape({
    email: string().email().required(),
    password: string().required()
  })

  return credentialsInputSchema.validate(data, {
    strict: true,
    stripUnknown: true,
    abortEarly: false,
  })
    .then(() => {
      return { data: data, error: null }
    }).catch(err => {
      return { data: null, error: err.errors.join(", ") }
    })
}

export const validateRegistration = (data: RegistrationInput): Promise<{ data: RegistrationInput | null, error: string | null }> => {
  const registrationInputSchema = object().shape({
    email: string().email().required(),
    password: string().required().min(6),
    name: string().notRequired(),
  })

  return registrationInputSchema.validate(data, {
    strict: true,
    stripUnknown: true,
    abortEarly: false,
  })
    .then(() => {
      return { data: data, error: null }
    }).catch(err => {
      return { data: null, error: err.errors.join(", ") }
    })
}
