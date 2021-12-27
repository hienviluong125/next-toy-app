import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'

import {
  composeHandlers,
  withMultiHandlers,
  withErrorResponse,
  withAuthentication
} from '@backend/common/commonHandler'
import { profileHandler } from '@backend/handlers/userHandler'

// all handlers should catch error and authenticate
const composedHandler = composeHandlers(withErrorResponse, withAuthentication)
const handlers: MultiHandlers = {
  "GET": composedHandler(profileHandler)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
