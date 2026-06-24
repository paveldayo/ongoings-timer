'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { and, eq } from "drizzle-orm"
import { ActionResult } from "@/types"

export async function deleteCard(id: string): Promise<ActionResult> {
  try {
    const userId = await requireAuthenticatedUserId()

    await db.delete(cards).where(and(
      eq(cards.id, id),
      eq(cards.owner_id, userId),
    ))

    return {
      success: true,
      data: null,
    }
  } catch(error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to delete card",
    }
  }
}
