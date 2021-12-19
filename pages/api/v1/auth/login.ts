import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { loginHandler } from '@backend/handlers/authHandler'
import { execMultiHandlers } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "POST": loginHandler
}

const handler = (req: NextApiRequest, res: NextApiResponse) => execMultiHandlers(req, res, handlers)

export default handler
