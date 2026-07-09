'use server'

import { Card } from "@/entities/card/types"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { ActionResult } from "@/types"
import { captureException } from "@sentry/nextjs"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const archiveCard = async (card: Card): Promise<ActionResult> => {
  try {
    const userId = await requireAuthenticatedUserId()

    const updatedRows = await db
      .update(cards)
      .set({
        is_archived: true
      })
      .where(and(
        eq(cards.id, card.id),
        eq(cards.owner_id, userId),
      ))
      .returning({ id: cards.id })

    if (updatedRows.length === 0) {
      return {
        success: false,
        error: "Card not found",
      }
    }

    revalidatePath("/cards-list")

    return {
      success: true,
      data: null
    }
  } catch (error) {
    captureException(new Error("Failed to update card record in db to archive it", { cause: error }), {
      tags: { action: "archiveCard" },
      extra: { cardId: card.id, isArchived: card.is_archived },
    })

    return {
      success: false,
      error: "Failed to update card record in db to archive it",
    }
  }
}
