import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { NextAuthRequest } from "next-auth"

const PUBLIC_PATHS = new Set(["/sign-in"]) // TODO: Move to config layer

export default auth((request: NextAuthRequest) => {
  const isAuthenticated = request.auth !== null
  const { pathname } = request.nextUrl
  const isPublicPath = PUBLIC_PATHS.has(pathname)

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/cards-list", request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/",
    "/cards-list/:path*",
    "/sign-in",
  ],
}
