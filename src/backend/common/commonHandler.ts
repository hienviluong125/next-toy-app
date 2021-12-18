import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { handlerErr } from './errorHandler';

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type MultiHandlers = Partial<Record<HttpMethods, NextApiHandler>>

export const execHandler = (handlerFn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handlerFn(req, res)
    } catch (e) {
      handlerErr(res, e)
    }
  }
};

export const execMultiHandlers = (req: NextApiRequest, res: NextApiResponse, handlers: MultiHandlers) => {
  const methodName: HttpMethods = req.method as HttpMethods

  if (!methodName) {
    return res.status(400).json({ status: 404, message: "Invalid method", errCode: "badRequest" })
  }

  const handlerFn = handlers[methodName]

  if (handlerFn) {
    return execHandler(handlerFn)(req, res)
  } else {
    return res.status(400).json({ status: 404, message: "Method not allowed", errCode: "badRequest" })
  }
}
