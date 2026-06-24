'use server'
import { getNextEpisodeAt } from "@/entities/card/utils/getNextEpisodeAt"
import { requireAuthenticatedUserId } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"
import { cards } from "@/lib/database/schema"
import { eq } from "drizzle-orm"

export const  getInitialCards = async () => {
 const userId = await requireAuthenticatedUserId()
 await new Promise(r => setTimeout(r, 500))

  try {
    const rawCards = (await db.query.cards.findMany({
      where: eq(cards.owner_id, userId),
    }))
    // .sort((a,b) => +b.created_at - +a.created_at)

    return rawCards.map(card => ({
      ...card,
      next_episode_at: getNextEpisodeAt({
        releaseDayOfWeek: card.release_day_of_week,
        releaseTime: card.release_time,
      }),
    }))

  } catch(error) {
    console.error(error)
    return []
  }
}
