import { NextRequest } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "@/lib/storage/s3"
import { join } from "path"
import { readFile } from "fs/promises"
import { captureException } from "@sentry/nextjs"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params

  if (key === "null") {
    try {
      const filePath = join(process.cwd(), "public", "placeholder.png")
      const fileBuffer = await readFile(filePath)
      
      return new Response(fileBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      })
    } catch (error) {
      console.error("Failed to load placeholder image", error)

      captureException(new Error("Failed to load 'placeholder.png'. Placeholder not found", { cause: error }), {
        tags: {
          action: "get image",
          imageSource: "~/public folder",
        },
        extra: {
          requestedKey: key,
          placeholderPath: join(process.cwd(), "public", "placeholder.png"),
        },
      })
      return new Response("Placeholder not found", { status: 500 })
    }
  }

  try {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      })
    )
    return new Response(res.Body as ReadableStream, {
      headers: {
        "Content-Type": res.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch(error) {
    console.error("Can't get image from S3!", error)
    
    captureException(new Error("Failed to get image from S3", { cause: error }), {
      tags: {
        action: "get image",
        imageSource: "S3",
      },
      extra: {
        Bucket: process.env.S3_BUCKET,
        Key: key
      },
    })

    return new Response("Error!", { status: 500 })
  }
}