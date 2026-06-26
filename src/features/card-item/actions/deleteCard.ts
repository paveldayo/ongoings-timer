'use server'

import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { s3 } from "@/lib/storage/s3"
import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"
import { ActionResult } from "@/types"

export async function deleteCard(id: string): Promise<ActionResult> {
  try {
    const userId = await requireAuthenticatedUserId()

    const existingCard = await db.query.cards.findFirst({
      where: and(
        eq(cards.id, id),
        eq(cards.owner_id, userId),
      ),
      columns: {
        id: true,
        image_key: true,
      },
    })

    if (!existingCard) {
      return {
        success: false,
        error: "Card not found",
      }
    }

    if (existingCard.image_key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET!,
          Key: existingCard.image_key,
        })
      )
    }

    await db.delete(cards).where(and(
      eq(cards.id, id),
      eq(cards.owner_id, userId),
    ))

    revalidatePath("/cards-list")

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
