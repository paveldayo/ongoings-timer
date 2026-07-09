import { Card } from "@/entities/card/types"
import { useState } from "react"

interface Props {
  initialCards: Card[]
}

export const useArchivedCardsList = ({ initialCards }: Props) => {
  const [filter, setFilter] = useState<string>('')
  const [ascSort, setAscSort] = useState(false)

  const normalizedFilter = filter.trim().toLowerCase()
  
  const cards = (initialCards || [])
    .filter(card =>
      normalizedFilter.length === 0
        ? true
        : card.title.toLowerCase().includes(normalizedFilter)
    )
    .toSorted((left, right) => (
      ascSort
        ? +left.created_at - +right.created_at
        : +right.created_at - +left.created_at
    ))

  return {
    filter,
    setFilter,
    cards,
    ascSort,
    setAscSort
  }
}