import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { CredentialsInput } from '@backend/validators/userValidator'
import { validateCrendetials } from '@backend/validators/userValidator'
import { InvalidCredentialsError } from '@backend/common/errors'
import { compareSync } from 'bcryptjs'
import { generateAccessToken, generateRefreshTokenCookie, generateRefreshToken } from '@backend/common/tokenProvider'
import prismaClient from '@backend/prisma'
import { get, del } from '@upstash/redis'

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

  const accessToken = generateAccessToken(user.id)

  if (!accessToken) throw new InvalidCredentialsError

  const refreshToken = await generateRefreshToken(user.id)

  if (!refreshToken)  throw new InvalidCredentialsError

  const refreshTokenCookie = generateRefreshTokenCookie(refreshToken)

  return res
    .setHeader('Set-Cookie', refreshTokenCookie)
    .status(200)
    .json({ accessToken })
}

const keepLoginHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.status(404).end()

  const { data, error } = await get(refreshToken)

  if (error) return res.status(404).end()

  const userId = Number(data)
  const accessToken = generateAccessToken(userId)

  return res.status(200).json({ accessToken })
}

const logoutHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.status(404).end()

  const { error } = await del(refreshToken)

  if (error) return res.status(404).end()

  const clearedRefreshTokenCookie = generateRefreshTokenCookie(refreshToken, { maxAge: 0 })

  return res
    .setHeader('Set-Cookie',clearedRefreshTokenCookie)
    .status(204)
    .end()
}

export {
  loginHandler,
  keepLoginHandler,
  logoutHandler,
}
