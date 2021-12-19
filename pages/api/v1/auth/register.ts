import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { registerHanlder } from '@backend/handlers/userHandler'
import { withMultiHandlers, withErrorResponse } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "POST": withErrorResponse(registerHanlder)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
