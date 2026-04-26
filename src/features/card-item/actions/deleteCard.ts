'use server'

import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { eq } from "drizzle-orm"

export async function deleteCard(id: string) {
  try {
    await db.delete(cards).where(eq(cards.id, id))
  } catch(error) {
    console.error(error)
  }
}