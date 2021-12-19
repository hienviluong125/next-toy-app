import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { withMultiHandlers, withErrorResponse, withAuthentication } from '@backend/common/commonHandler'
import { getSinglePropertyHandler, updatePropertyHandler, destroyPropertyHandler } from '@backend/handlers/propertiesHandler'

const handlers: MultiHandlers = {
  "GET": withErrorResponse(withAuthentication(getSinglePropertyHandler)),
  "PUT": withErrorResponse(withAuthentication(updatePropertyHandler)),
  "PATCH": withErrorResponse(withAuthentication(updatePropertyHandler)),
  "DELETE": withErrorResponse(withAuthentication(destroyPropertyHandler)),
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
