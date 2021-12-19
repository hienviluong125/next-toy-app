import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { getPropertiesHandler, createPropertyHandler } from '@backend/handlers/propertiesHandler'
import { withMultiHandlers, withAuthentication, withErrorResponse } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "GET": withErrorResponse(withAuthentication(getPropertiesHandler)),
  "POST": withErrorResponse(withAuthentication(createPropertyHandler))
}

const handler = (req: NextApiRequest, res: NextApiResponse) => withMultiHandlers(req, res, handlers)

export default handler
