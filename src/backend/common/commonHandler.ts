import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type MultiHandlers = Partial<Record<HttpMethods, NextApiHandler>>

export const execMultiHandlers = (req: NextApiRequest, res: NextApiResponse, handlers: MultiHandlers) => {
  const methodName: HttpMethods = req.method as HttpMethods

  if (!methodName) res.status(404).json("Invalid method")

  const handlerFn = handlers[methodName]

  if (handlerFn) {
    handlerFn(req, res)
  } else {
    res.status(404).json("Method not allowed")
  }
}
