'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { and, eq } from "drizzle-orm"

export async function deleteCard(id: string) {
  try {
    const userId = await requireAuthenticatedUserId()

    await db.delete(cards).where(and(
      eq(cards.id, id),
      eq(cards.owner_id, userId),
    ))

    return { success: true }
  } catch(error) {
    console.error(error)
    return { success: false, error }
  }
}
