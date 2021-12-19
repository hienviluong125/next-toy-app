import type { User } from '@prisma/client'
import type { SignOptions } from 'jsonwebtoken'
import { sign as signJwt } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'

const SECRET = "JWT_SECRET"

export type AccessTokenPayload = {
  userId: number
}

export const generateAccessToken = (user: User): string => {
  const payload: AccessTokenPayload = { userId: user.id }
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: 15 * 60, // 15 minutes
  }
  return signJwt(payload, SECRET, signOptions)
}

export const generateRefreshToken = (user: User): string => {
  return uuidV4()
}
