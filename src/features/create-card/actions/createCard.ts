'use server'

import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { s3 } from "@/lib/storage/s3"
import { revalidatePath } from "next/cache"
import {  PutObjectCommand } from "@aws-sdk/client-s3"
import { cardFormSchema } from "@/entities/card/model/cardFormSchema"
import { ActionResult } from "@/types"

export async function createCard(formData: FormData): Promise<ActionResult> {
  try {
    const userId = await requireAuthenticatedUserId()

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

    let imageKey: string | null = null

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

    await db.insert(cards).values({
      owner_id: userId,
      title: data.title,
      player_url: data.player_url || null,
      episodes_total: data.episodes_total,
      episodes_watched: data.episodes_watched,
      release_day_of_week: data.release_day_of_week,
      release_time: data.release_time,
      image_key: imageKey,
    })

    revalidatePath("/cards-list")

    return {
      success: true,
      data: null,
    }
  } catch(error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to create card",
    }
  }
}
