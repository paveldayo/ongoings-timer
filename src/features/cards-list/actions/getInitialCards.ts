'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { eq } from "drizzle-orm"
import { captureException } from "@sentry/nextjs"

export const getInitialCards = async () => {
  const userId = await requireAuthenticatedUserId()
  await new Promise(r => setTimeout(r, 500))

  try {
    return await db.query.cards.findMany({
      where: eq(cards.owner_id, userId),
    })
  } catch (error) {
    captureException(new Error("Error occurred during initial cards loading", { cause: error }), {
      tags: { action: "getInitialCards" },
      extra: { userId },
    })
    return []
  }
}
