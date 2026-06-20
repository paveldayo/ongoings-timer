'use client'

import { Card } from "@/entities/card/types";
import CardsList from "@/features/cards-list/components/CardsList";
import CardsListControls from "@/features/cards-list/components/CardsListControls";
import { useCardsList } from "@/features/cards-list/hooks/useCardsList";
import CreateCardFormWrapper from "@/features/create-card/components/CreateCardFormWrapper";
import { useSelectedDay } from "@/hooks/useSelectedDay";

export default function CardsPanel({ initialCards }: { initialCards: Card[] }) {
  const { cards, filter, setFilter, ascSort, setAscSort } = useCardsList({ initialCards })
  const { selectedDay } = useSelectedDay()

  return (
    <div className="space-y-3">
      selectedDay: {selectedDay}
      <CardsListControls
        filter={filter}
        setFilter={setFilter}
        ascSort={ascSort}
        setAscSort={setAscSort}
        renderActions={() => <CreateCardFormWrapper />}
      />

      <CardsList cards={cards} />
    </div>
  )
}
