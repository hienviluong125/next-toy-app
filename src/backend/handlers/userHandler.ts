import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { RegistrationInput } from '@backend/validators/userValidator'
import { validateRegistration } from '@backend/validators/userValidator'
import { CannotProcessRecordError } from '@backend/common/errors'
import { generateAccessToken, generateRefreshToken } from '@backend/common/tokenProvider'
import { hashSync } from 'bcryptjs'
import prismaClient from '@backend/prisma'
import { Prisma } from '@prisma/client'


type RegistrationResponse = {
  accessToken: string
  refreshToken: string
}

const registerHanlder: NextApiHandler<RegistrationResponse> = async (req: NextApiRequest, res: NextApiResponse) => {
  let registrationInput: RegistrationInput = req.body

  const { error } = await validateRegistration(registrationInput)

  if (error) throw new Error(error)

  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: registrationInput.email
    }
  })

  if (existingUser) throw new Error("Email already be taken")

  const hashedPassword: string = hashSync(registrationInput.password)

  let userInput: Prisma.UserCreateInput = {
    email: registrationInput.email,
    password: hashedPassword,
    name: registrationInput.name,
  }

  const user = await prismaClient.user.create({ data: userInput })

  if (!user) throw new CannotProcessRecordError("user")

  return res.status(200).json({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user)
  })
}

export {
  registerHanlder
}
