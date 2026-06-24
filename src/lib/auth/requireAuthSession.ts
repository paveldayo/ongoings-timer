import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function requireAuthSession() {
  const session = await auth()

  if (!session?.user) {
    redirect("/sign-in")
  }

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
