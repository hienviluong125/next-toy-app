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
 //Todo: Need to add somethings here

  return NextResponse.next()
}
