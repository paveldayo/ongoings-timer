import { getInitialCards } from "@/features/cards-list/actions"
import CardsListScreen from "./components/CardsListScreen"

export default async function CardsListPage() {
  const initialCards = await getInitialCards() // No filters, no sorting, just basic list of cards from SSR
  
  return (
    <CardsListScreen initialCards={initialCards} />
  )
}
