import { NextRequest, NextResponse } from 'next/server'
import redisClient from '@backend/common/redisClient'

const CACHING_PAGES = [
  '/api/v1/properties',
  '/api/v1/properties/[pid]'
]

const jsonResponse = (status: number, data: any, init?: ResponseInit) => {
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
  if (req.method === 'GET' && CACHING_PAGES.includes(pageName)) {
    let { data } = await redisClient.get(req.nextUrl.pathname)
    if (data) {
      console.log(`Get cached response with\npage name: ${pageName}\npage url: ${req.nextUrl.pathname}\ntimestamp: ${(new Date()).getTime()}`)
      return jsonResponse(200, data)
    }
  }

  return NextResponse.next()
}
