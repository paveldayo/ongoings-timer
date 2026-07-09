import { Card } from "@/entities/card/types";
import { useArchivedCardsList } from "@/features/archive/hooks/useArchivedCardsList";
import CardsList from "@/features/cards-list/components/CardsList";
import CardsListControls from "@/features/cards-list/components/CardsListControls";
import { ArchivedCardItem } from "@/widgets/archived-card-item/components/ArchivedCardItem";

interface Props {
  initialCards: Card[]
}

export function ArchivedCardsPanel({ initialCards }: Props) {
  const { cards, filter, setFilter, ascSort, setAscSort } = useArchivedCardsList({ initialCards })
  
  return (
    <div className="space-y-3 mb-5">
      <CardsListControls
        filter={filter}
        setFilter={setFilter}
        ascSort={ascSort}
        setAscSort={setAscSort}
      />

      <CardsList
        cards={ cards }
        renderCardItem={(card, key) => (
          <ArchivedCardItem card={card} key={key} />
        )}
      />
    </div>
  )
}