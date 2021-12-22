import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'

import {
  composeHandlers,
  withMultiHandlers,
  withErrorResponse,
  withAuthentication
} from '@backend/common/commonHandler'
import { getSinglePropertyHandler, updatePropertyHandler, destroyPropertyHandler } from '@backend/handlers/propertiesHandler'

// all handlers should catch error and authenticate
const composedHandler = composeHandlers(withErrorResponse, withAuthentication)
const handlers: MultiHandlers = {
  "GET": composedHandler(getSinglePropertyHandler),
  "PUT": composedHandler(updatePropertyHandler),
  "PATCH": composedHandler(updatePropertyHandler),
  "DELETE": composedHandler(destroyPropertyHandler),
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
