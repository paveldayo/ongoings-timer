import { Card } from "@/entities/card/types";
import { ReactNode } from "react";

interface Props {
  filterFn: (card: Card) => boolean
  cards: Card[]
  renderCardItem: (data: Card, key: string) => ReactNode
}

export default function CardsList({ filterFn, cards, renderCardItem }: Props) {
  const filteredCards = cards.filter(c => filterFn(c))
  
  if (filteredCards.length === 0) {
    return (
      <div className="text-muted-foreground text-center mt-10">
        Nothing here yet ¯\_(ツ)_/¯ 
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* TODO: Add one card by default when user visits this page for the first time */}
      {filteredCards.map(c => renderCardItem(c, c.id))}
    </div>
  );
}