'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { and, eq, sql } from "drizzle-orm"
import { captureException } from "@sentry/nextjs"
import { ActionResult } from "@/types"

export async function changeWatched(id: string, diff: -1 | 1): Promise<ActionResult> {
  try {
    const userId = await requireAuthenticatedUserId()

    const updatedRows = await db
      .update(cards)
      .set({
        episodes_watched: sql`
          greatest(
            0,
            least(
              ${cards.episodes_watched} + ${diff},
              ${cards.episodes_total}
            )
          )
        `,
      })
      .where(and(
        eq(cards.id, id),
        eq(cards.owner_id, userId),
      ))
      .returning({ id: cards.id })

    if (updatedRows.length === 0) {
      return {
        success: false,
        error: "Card not found",
      }
    }

    return {
      success: true,
      data: null,
    }
  } catch (error) {
    captureException(new Error("Failed to update watched episodes counter", { cause: error }), {
      tags: { action: "changeWatched" },
      extra: { cardId: id, diff },
    })
    return {
      success: false,
      error: "Failed to update watched episodes",
    }
  }
}
