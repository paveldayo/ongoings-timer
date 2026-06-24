import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import { db } from "@/lib/database/drizzle"
import {
  accounts,
  sessions,
  users,
} from "@/lib/database/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [GitHub],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }

      return session
    },
  },
})
