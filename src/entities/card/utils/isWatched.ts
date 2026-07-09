import { Card } from "@/entities/card/types"

export const isWatched = (card: Card): boolean => {
  return card.episodes_watched >= card.episodes_total
}