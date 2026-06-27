import * as Sentry from "@sentry/nextjs"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function requireAuthSession() {
  const session = await auth()

  if (!session?.user) {
    redirect("/sign-in")
  }

  Sentry.setUser({
    id: session.user.id,
    email: session.user.email ?? undefined,
    username: session.user.name ?? undefined,
  })

  return session
}

export async function requireAuthenticatedUserId() {
  const session = await requireAuthSession()
  const userId = session.user.id

  if (!userId) {
    redirect("/sign-in")
  }

  return userId
}
