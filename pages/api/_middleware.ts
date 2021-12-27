import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@backend/common/tokenProvider';
import redisClient from '@backend/common/redisClient'

const CACHING_PAGES = [
  '/api/v1/properties',
  '/api/v1/properties/[pid]'
]

const AUTH_PAGES = [
  '/api/v1/properties',
  '/api/v1/properties/[pid]',
  '/api/v1/auth/keepLogin',
  '/api/v1/profile',
  '/api/v1/auth/logout'
]

const verifyAuth = (req: NextRequest): boolean => {
  const authorizationHeader = req.headers.get('authorization')

  if (!authorizationHeader) return false

  const [tokenType, token] = authorizationHeader.split(" ")

  if (tokenType !== "Bearer") return false

  let { error } = decodeToken(token)

  if (error) return false

  return true
}

const jsonResponse = (status: number, data?: any, init?: ResponseInit) => {
  return new Response(data, {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  })
}

export async function middleware(req: NextRequest) {
  const pageName = req.page.name as string
  let canContinue: boolean = true
  if (AUTH_PAGES.includes(pageName)) {
    canContinue = await verifyAuth(req)
  }

  if (!canContinue) {
    return jsonResponse(404)
  }

  if (req.method === 'GET' && CACHING_PAGES.includes(pageName)) {
    let { data } = await redisClient.get(req.nextUrl.pathname)
    if (data) {
      console.log(`Get cached response with\npage name: ${pageName}\npage url: ${req.nextUrl.pathname}\ntimestamp: ${(new Date()).getTime()}`)
      return jsonResponse(200, data)
    }
  }

  return NextResponse.next()
}
