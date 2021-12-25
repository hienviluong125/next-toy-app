import type { CookieSerializeOptions } from 'cookie'
import type { SignOptions } from 'jsonwebtoken'

import { sign as signJwt, verify } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { serialize as serializeCookie } from 'cookie'
import redisClient from './redisClient'

const SECRET = "JWT_SECRET"
const AT_EXPIRY = 15 * 60 // 15 mins
const RT_EXPIRY = 7 * 24 * 60 * 60 // 7 days

export type AccessTokenPayload = {
  userId: number
}

export const generateAccessToken = (userId: number): string => {
  const payload: AccessTokenPayload = { userId: userId }
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: AT_EXPIRY
  }
  return signJwt(payload, SECRET, signOptions)
}

export const generateRefreshToken = async (userId: number) => {
  const token = uuidV4()
  const { data } = await redisClient.set(token, userId)
  if (data === 'OK') {
    return token
  }

  return null
}

export const generateRefreshTokenCookie = (
  refreshToken: string,
  {
    httpOnly = true,
    secure = process.env.NODE_ENV === 'production',
    path = '/api',
    maxAge = RT_EXPIRY,
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
