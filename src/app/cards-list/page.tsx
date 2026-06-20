import { getInitialCards } from "@/features/cards-list/actions/getInitialCards"
import CardsListScreen from "./components/CardsListScreen"

export default async function CardsListPage() {
  const initialCards = await getInitialCards() // No filters, no sorting, just basic list of cards for SSR
  
  return (
    <CardsListScreen initialCards={initialCards} />
  )
}
