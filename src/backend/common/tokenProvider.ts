import type { CookieSerializeOptions } from 'cookie'
import type { SignOptions } from 'jsonwebtoken'

import { sign as signJwt, verify } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { serialize as serializeCookie } from 'cookie'
import prismaClient from '@backend/prisma'

const SECRET = "JWT_SECRET"

export type AccessTokenPayload = {
  userId: number
}

export const generateAccessToken = (userId: number): string => {
  const payload: AccessTokenPayload = { userId: userId }
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: 15 * 60, // 15 mins
  }
  return signJwt(payload, SECRET, signOptions)
}

export const generateRefreshToken = async (userId: number) => {
  const { token } = await prismaClient.refreshToken.upsert({
    where: {
      userId,
    },
    update: {
      token: uuidV4(),
    },
    create: {
      userId,
      token: uuidV4(),
    },
  })

  return token
}

export const generateRefreshTokenCookie = (
  refreshToken: string,
  {
    httpOnly = true,
    secure = process.env.NODE_ENV === 'production',
    path = '/api',
    maxAge = 60 * 60, // 60 mins
    sameSite = 'lax',
  }: CookieSerializeOptions = {}
) =>
  serializeCookie('refreshToken', refreshToken, {
    httpOnly,
    secure,
    path,
    maxAge,
    sameSite,
  })

export const decodeToken = (token: string): { payload: AccessTokenPayload | null, error: string | null } => {
  let resp: { payload: AccessTokenPayload | null, error: string | null } = { payload: null, error: null }

  verify(token, SECRET, function (err, payload) {
    if (err) {
      resp.error = err.message
    } else {
      resp.payload = payload as AccessTokenPayload
    }
  });

  return resp
}
