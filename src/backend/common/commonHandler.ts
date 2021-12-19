import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client';
import type { AccessTokenPayload } from './tokenProvider';
import { handlerErr } from './errorHandler';
import { InvalidCredentialsError } from './errors';
import { decodeToken } from './tokenProvider';
import prismaClient from './../prisma'


export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type HandlerCtx = {
  user: User | null
}
export type NextApiHandlerWithCtx<T = any> = (req: NextApiRequest, res: NextApiResponse<T>, ctx?: HandlerCtx) => void | Promise<void>
export type MultiHandlers = Partial<Record<HttpMethods, NextApiHandler | NextApiHandlerWithCtx>>

export const withAuthentication = (handlerFn: NextApiHandlerWithCtx) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) return handlerErr(res, new InvalidCredentialsError)

    const [tokenType, token] = authorizationHeader.split(" ")

    if (tokenType !== "Bearer") return handlerErr(res, new InvalidCredentialsError)

    let { payload, error } = decodeToken(token)

    if (error) return handlerErr(res, new InvalidCredentialsError)

    payload = payload as AccessTokenPayload

    // Pass user into ctx
    let ctx: HandlerCtx = { user: null }

    if (payload) {
      const user = await prismaClient.user.findUnique({
        where: { id: payload.userId },
        select: { email: true, name: true, id: true},
      })

      if (user) {
        ctx.user = user as User
      }
    }

    return handlerFn(req, res, ctx)
  }
}

export const withErrorResponse = (handlerFn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handlerFn(req, res)
    } catch (e) {
      handlerErr(res, e)
    }
  }
};

export const withMultiHandlers = (req: NextApiRequest, res: NextApiResponse, handlers: MultiHandlers) => {
  const methodName: HttpMethods = req.method as HttpMethods

  if (!methodName) {
    return res.status(400).json({ status: 404, message: "Invalid method", errCode: "badRequest" })
  }

  const handlerFn = handlers[methodName]

  if (handlerFn) {
    return handlerFn(req, res)
  } else {
    return res.status(400).json({ status: 404, message: "Method not allowed", errCode: "badRequest" })
  }
}
