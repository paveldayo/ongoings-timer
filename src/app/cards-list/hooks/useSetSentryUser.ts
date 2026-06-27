import { setUser } from "@sentry/nextjs"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export const useSetSentryUser = () => {
  const session = useSession()
    useEffect(() => {
      if (session.data) {
        setUser({
          id: session.data.user.id,
          email: session.data.user.email ?? undefined,
          username: session.data.user.name ?? undefined,
        })
      } else {
        setUser(null)
      }
    }, [session.data])
}