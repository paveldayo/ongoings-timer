
import { cards } from "@/lib/database/schema"
import { InferSelectModel } from "drizzle-orm"

// Card type that frontend will recieve and work with
export type Card = InferSelectModel<typeof cards>
