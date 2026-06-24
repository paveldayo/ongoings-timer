'use server'

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import { cardFormSchema } from "@/entities/card/model/cardFormSchema"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { s3 } from "@/lib/storage/s3"
import { ActionResult } from "@/types"

export async function updateCard(id: string, formData: FormData): Promise<ActionResult> {
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

    const parsed = cardFormSchema.safeParse({
      title: formData.get("title"),
      player_url: formData.get("player_url"),
      episodes_total: formData.get("episodes_total"),
      episodes_watched: formData.get("episodes_watched"),
      release_day_of_week: formData.get("release_day_of_week"),
      release_time: formData.get("release_time"),
    })

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid card data",
      }
    }

    const coverEntry = formData.get("cover")
    const cover = coverEntry instanceof File ? coverEntry : null
    const data = parsed.data

    let imageKey = existingCard.image_key

    if (cover && cover.size > 0) {
      const buffer = Buffer.from(await cover.arrayBuffer())
      imageKey = `cover_${Math.random().toString().substring(2, 10)}`

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET!,
          Key: imageKey,
          Body: buffer,
          ContentType: cover.type,
        })
      )
    }

    const updatedRows = await db
      .update(cards)
      .set({
        title: data.title,
        player_url: data.player_url || null,
        episodes_total: data.episodes_total,
        episodes_watched: data.episodes_watched,
        release_day_of_week: data.release_day_of_week,
        release_time: data.release_time,
        image_key: imageKey,
      })
      .where(and(
        eq(cards.id, id),
        eq(cards.owner_id, userId),
      ))
      .returning({ id: cards.id })

    if (updatedRows.length === 0) {
      return {
        success: false,
        error: "Failed to update card",
      }
    }

    revalidatePath("/cards-list")
    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to update card",
    }
  }
}
