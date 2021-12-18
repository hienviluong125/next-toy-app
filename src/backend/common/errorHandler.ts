import type { NextApiResponse } from 'next'
import {
  CannotGetRecordError,
  CannotGetRecordListError,
  CannotProcessRecordError,
  CannotDeleteRecordError,
  InvalidCredentialsError
} from '@backend/common/errors'

type AppError = {
  status: number
  message: string
  errCode: string
  log: any
}

export const handlerErr = (res: NextApiResponse, error: any) => {
  let appError: AppError

  switch (error.constructor) {
    case CannotGetRecordError:
    case CannotGetRecordListError:
      appError = { status: 404, message: error.message, errCode: error.errCode, log: error }
    case CannotProcessRecordError:
    case CannotDeleteRecordError:
      appError = { status: 422, message: error.message, errCode: error.errCode, log: error }
    case Error:
      appError = { status: 400, message: error.message, errCode: 'badRequest', log: error }
    case InvalidCredentialsError:
      appError = { status: 401, message: error.message, errCode: 'invalidCredentials', log: error }
    default:
      appError = { status: 500, message: "Internal Server Error", errCode: 'internalServerError', log: error }
  }

  // Write error to server's log
  console.log({ appError })

  res.status(appError.status).json({
    status: appError.status,
    message: appError.message,
    errCode: appError.errCode
  })
}
