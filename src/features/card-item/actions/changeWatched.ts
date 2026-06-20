'use server'

import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { eq, sql } from "drizzle-orm"

export async function changeWatched(id: string, diff: -1 | 1) {
  try {
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
  }).where(eq(cards.id, id));
  } catch(error) {
    console.error(error)
  }
}