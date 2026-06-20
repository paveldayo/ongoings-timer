import { Card } from "@/entities/card/types";
import { ReactNode } from "react";

interface Props {
  cards: Card[]
  renderCardItem: (data: Card, key: string) => ReactNode
}


export default function CardsList({ cards, renderCardItem }: Props) {
  return (
    <div className="space-y-3">
      { cards.map(c => renderCardItem(c, c.id)) }
    </div>
  )
}