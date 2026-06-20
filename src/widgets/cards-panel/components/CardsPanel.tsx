'use client'

// Widgets can orchestrate work of multiple features
// THat's why importing components from cards-list, cards-list and create-card features is completely fine in this example

import { Card } from "@/entities/card/types";

import CreateCardFormWrapper from "@/features/create-card/components/CreateCardFormWrapper";
import CardItem from "@/features/card-item/components/CardItem";
import CardsList from "@/features/cards-list/components/CardsList";
import CardsListControls from "@/features/cards-list/components/CardsListControls";
import { useCardsList } from "@/features/cards-list/hooks/useCardsList";

interface Props {
  initialCards: Card[]
  selectedDay: number
}

export default function CardsPanel({ initialCards, selectedDay }: Props) {
  const { cards, filter, setFilter, ascSort, setAscSort } = useCardsList({ initialCards })

  return (
    <div className="space-y-3">
      <CardsListControls
        filter={filter}
        setFilter={setFilter}
        ascSort={ascSort}
        setAscSort={setAscSort}
        renderActions={() => <CreateCardFormWrapper />}
      />

      <CardsList
        selectedDay={ selectedDay }
        cards={ cards }
        renderCardItem={(cardData, key) => (
          <CardItem card={cardData} key={key} />
        )}
      />
    </div>
  )
}
