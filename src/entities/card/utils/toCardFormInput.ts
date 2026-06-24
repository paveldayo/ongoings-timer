import { Card } from "../types"
import { CardFormInput } from "../model/cardFormSchema"

export function toCardFormInput(card: Card): CardFormInput {
  return {
    title: card.title,
    player_url: card.player_url ?? "",
    episodes_total: card.episodes_total,
    episodes_watched: card.episodes_watched,
    release_day_of_week: card.release_day_of_week,
    release_time: card.release_time,
  }
}
