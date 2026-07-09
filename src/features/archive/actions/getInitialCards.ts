'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { captureException } from "@sentry/nextjs"
import { and, eq } from "drizzle-orm"

export const getInitialCards = async () => {
  const userId = await requireAuthenticatedUserId()

  try {
    return await db.query.cards.findMany({
      where: and(
        eq(cards.owner_id, userId),
        eq(cards.is_archived, true)
      ),
    })
  } catch (error) {
    captureException(new Error("Error occurred during initial archive loading", { cause: error }), {
      tags: { action: "getInitialCards (archive)" },
      extra: { userId },
    })
    
    return []
  }
}