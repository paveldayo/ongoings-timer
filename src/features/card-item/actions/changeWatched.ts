'use server'

import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { and, eq, sql } from "drizzle-orm"

export async function changeWatched(id: string, diff: -1 | 1) {
  try {
   const userId = await requireAuthenticatedUserId()

   await db.update(cards).set({
    episodes_watched: sql`
      greatest(
        0,
        least(
          ${cards.episodes_watched} + ${diff},
          ${cards.episodes_total}
        )
      )
    `,
  }).where(and(
    eq(cards.id, id),
    eq(cards.owner_id, userId),
  ));
  } catch(error) {
    console.error(error)
  }
}
