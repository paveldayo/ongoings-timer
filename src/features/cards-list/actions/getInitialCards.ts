'use server'
import { getNextEpisodeAt } from "@/entities/card/utils/getNextEpisodeAt"
import { requireAuthSession } from "@/lib/auth/requireAuthSession"
import { db } from "@/lib/database/drizzle"

export const  getInitialCards = async () => {
 await requireAuthSession()
 await new Promise(r => setTimeout(r, 500))

  try {
    const rawCards = (await db.query.cards.findMany()).sort((a,b) => +b.created_at - +a.created_at)

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
