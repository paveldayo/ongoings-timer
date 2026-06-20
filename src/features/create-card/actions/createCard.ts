'use server'

import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { s3 } from "@/lib/storage/s3"
import { revalidatePath } from "next/cache"
import {  PutObjectCommand } from "@aws-sdk/client-s3"

export async function createCard(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const cover = formData.get("cover") as File | null
    console.log(title, "title")
    console.log(cover, "cover")

    let imageKey: string | null = null

    if (cover && cover.size > 0) {
      const buffer = Buffer.from(await cover.arrayBuffer())
      imageKey = `cover_${Math.random().toString().substring(2, 10)}`
      console.log("imageKey", imageKey)

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
      title,
      image_key: imageKey
      // episodes_total: data.episodes_total,
      // episodes_watched: data.episodes_watched
    })

    revalidatePath("/cards-list")

    return { success: true }
  } catch(error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to create card",
    }
  }
}
