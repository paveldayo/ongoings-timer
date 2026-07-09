'use client'

// Widgets conceptually can orchestrate work of multiple features
// That's why importing components from cards-list, cards-list and create-card features is completely fine in this example

import { Card } from "@/entities/card/types";

import CreateCardFormWrapper from "@/features/create-card/components/CreateCardFormWrapper";
import CardsList from "@/features/cards-list/components/CardsList";
import CardsListControls from "@/features/cards-list/components/CardsListControls";
import { useCardsList } from "@/features/cards-list/hooks";
import { BasicCardItem } from "@/widgets/basic-card-item/components/BasicCardItem";

interface Props {
  initialCards: Card[]
  selectedDay: number
}

export default function CardsPanel({ initialCards, selectedDay }: Props) {
  const { cards, filter, setFilter, ascSort, setAscSort } = useCardsList({ initialCards })

  return (
    <div className="space-y-3 mb-5">
      <CardsListControls
        filter={filter}
        setFilter={setFilter}
        ascSort={ascSort}
        setAscSort={setAscSort}
        renderActions={() => <CreateCardFormWrapper />}
      />

      <CardsList
        filterFn={c => c.release_day_of_week === selectedDay}
        cards={ cards }
        renderCardItem={(cardData, key) => (
          // <CardItem card={cardData} key={key} />
          <BasicCardItem card={cardData} key={key}  />
        )}
      />
    </div>
  )
}
