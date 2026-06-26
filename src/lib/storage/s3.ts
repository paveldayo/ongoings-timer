import { S3Client } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: "garage",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_SECRET!,
  },
})