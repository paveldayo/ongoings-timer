import { Card } from "@/entities/card/types";
import { ReactNode } from "react";

interface Props {
  selectedDay: number
  cards: Card[]
  renderCardItem: (data: Card, key: string) => ReactNode
}

export default function CardsList({ selectedDay = 0, cards, renderCardItem }: Props) {
  return (
    <div className="space-y-3">
      { 
        cards
          .filter(c => c.release_day_of_week === selectedDay)
          .map(c => renderCardItem(c, c.id))
      }
    </div>
  )
}