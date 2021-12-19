import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { registerHanlder } from '@backend/handlers/userHandler'
import { execMultiHandlers } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "POST": registerHanlder
}

const handler = (req: NextApiRequest, res: NextApiResponse) => execMultiHandlers(req, res, handlers)

export default handler
