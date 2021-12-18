import type { NextApiRequest, NextApiResponse } from 'next'
import type { MultiHandlers } from '@backend/common/commonHandler'
import { getPropertiesHandler, createPropertyHandler } from '@backend/handlers/propertiesHandler'
import { execMultiHandlers } from '@backend/common/commonHandler'

const handlers: MultiHandlers = {
  "GET": getPropertiesHandler,
  "POST": createPropertyHandler
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  execMultiHandlers(req, res, handlers)
}

export default handler
