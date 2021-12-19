import { decodeToken } from '@backend/common/tokenProvider';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server'

const handleInvalidCrendetials = () => {
  const data = {
    status: 401,
    message: "Invalid Credentials",
    errCode: "invalidCrendetials"
  }

  return new Response(JSON.stringify(data), { status: 401, headers: { 'Content-Type': 'application/json' } })
}

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl
  const pathname = url.pathname

  // login and register endpoint don't need to be protected
  if (pathname.includes("/auth/login") || pathname.includes("/auth/register")) {
    return NextResponse.next()
  }

  const authorizationHeader: string | null = req.headers.get("authorization")

  if (!authorizationHeader) return handleInvalidCrendetials()

  const [tokenType, token] = authorizationHeader.split(" ")

  if (tokenType !== "Bearer") return handleInvalidCrendetials()

  const { payload, error } = decodeToken(token)

  if (error) return handleInvalidCrendetials()

  //TODO: Set payload.userId as a global variable for all protected endpoints

  return NextResponse.next()
}
