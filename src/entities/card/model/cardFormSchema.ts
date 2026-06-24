import * as z from "zod"

export const cardFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title can't be blank")
      .max(300, "Title should be at most 300 characters"),
    player_url: z
      .string()
      .trim()
      .max(2048, "Player URL is too long")
      .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
        message: "Enter a valid URL",
      }),
    episodes_total: z.coerce
      .number()
      .int("Total episodes must be a whole number")
      .min(1, "Total episodes must be at least 1")
      .max(5000, "Total episodes is unrealistically high"),
    episodes_watched: z.coerce
      .number()
      .int("Watched episodes must be a whole number")
      .min(0, "Watched episodes can't be negative")
      .max(5000, "Watched episodes is unrealistically high"),
    release_day_of_week: z.coerce
      .number()
      .int()
      .min(0)
      .max(6),
    release_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use 24-hour HH:mm format"),
  })
  .refine((data) => data.episodes_watched <= data.episodes_total, {
    path: ["episodes_watched"],
    message: "Watched episodes can't exceed total episodes",
  })

export type CardFormInput = z.input<typeof cardFormSchema>
export type CardFormValues = z.infer<typeof cardFormSchema>
