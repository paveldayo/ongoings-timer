import { getInitialCards } from "@/features/archive/actions"
import ArchiveScreen from "./components/ArchiveScreen"

export default async function ArchivePage() {
  const initialCards = await getInitialCards()
  
  return (
    <ArchiveScreen initialCards={initialCards} />
  )
}
