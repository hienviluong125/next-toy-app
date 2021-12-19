import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { CredentialsInput } from '@backend/validators/userValidator'
import { validateCrendetials } from '@backend/validators/userValidator'
import { InvalidCredentialsError } from '@backend/common/errors'
import { compareSync } from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '@backend/common/tokenProvider'
import prismaClient from '@backend/prisma'

type LoginResponse = {
  accessToken: string
  refreshToken: string
}

const loginHandler: NextApiHandler<LoginResponse> = async (req: NextApiRequest, res: NextApiResponse) => {
  let credentialsInput: CredentialsInput = req.body

  const { error } = await validateCrendetials(credentialsInput)

  if (error) throw new InvalidCredentialsError

  const user = await prismaClient.user.findUnique({
    where: {
      email: credentialsInput.email
    }
  })

  if (!user) throw new InvalidCredentialsError

  if (!compareSync(credentialsInput.password, user.password)) throw new InvalidCredentialsError

  return res.status(200).json({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user)
  })
}

export {
  loginHandler
}
