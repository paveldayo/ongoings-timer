'use server'

import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { s3 } from "@/lib/storage/s3"
import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"
import { ActionResult } from "@/types"
import { captureException } from "@sentry/nextjs"

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
      try {
        const result = await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: existingCard.image_key,
          })
        )
        if (result.$metadata.httpStatusCode !== 200) {
          throw new Error("Result code is not 200", {
            cause: result
          })
        }
      } catch (error) {
        captureException(new Error("Failed to delete card cover from S3 while during card deletion", { cause: error }), {
          tags: { action: "deleteCard" },
          extra: {
            cardId: id,
            userId,
            imageKey: existingCard.image_key,
          },
        })
      }
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
  } catch (error) {
    captureException(new Error("Error occurred during card deletion", { cause: error }), {
      tags: { action: "deleteCard" },
      extra: { cardId: id },
    })
    return {
      success: false,
      error: "Failed to delete card",
    }
  }
}
