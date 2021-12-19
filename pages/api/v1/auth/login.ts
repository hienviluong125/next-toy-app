import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { loginHandler } from '@backend/handlers/authHandler'
import { withMultiHandlers, withErrorResponse } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "POST": withErrorResponse(loginHandler)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
