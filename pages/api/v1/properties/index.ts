import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'

import { getPropertiesHandler, createPropertyHandler } from '@backend/handlers/propertiesHandler'
import {
  composeHandlers,
  withMultiHandlers,
  withErrorResponse,
  withAuthentication
} from '@backend/common/commonHandler'

// all handlers should catch error and authenticate
const composedHandler = composeHandlers(withErrorResponse, withAuthentication)
const handlers: MultiHandlers = {
  "GET": composedHandler(getPropertiesHandler),
  "POST": composedHandler(createPropertyHandler)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
