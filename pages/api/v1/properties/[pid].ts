import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { execMultiHandlers } from '@backend/common/commonHandler'
import { getSinglePropertyHandler, updatePropertyHandler, destroyPropertyHandler } from '@backend/handlers/propertiesHandler'

const handlers: MultiHandlers = {
  "GET": getSinglePropertyHandler,
  "PUT": updatePropertyHandler,
  "PATCH": updatePropertyHandler,
  "DELETE": destroyPropertyHandler
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  execMultiHandlers(req, res, handlers)
}

export default handler
