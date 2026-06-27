'use client'

import { useState } from "react"

import { Card } from "@/entities/card/types"
import DayTabs from "@/features/day-tabs/components/DayTabs"
import UserMenu from "@/features/user-menu/components/UserMenu"
import AppHeader from "@/widgets/app-header/components/AppHeader"
import CardsPanel from "@/widgets/cards-panel/components/CardsPanel"
import { useSetSentryUser } from "../hooks"

interface Props {
  initialCards: Card[]
}

const buildHasContentByDay = (cards: Card[]) => {
  const daysWithContent = new Set(cards.map((card) => card.release_day_of_week))

  return Array.from({ length: 7 }, (_, dayIndex) => daysWithContent.has(dayIndex))
}

export default function CardsListScreen({ initialCards }: Props) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const hasContentByDay = buildHasContentByDay(initialCards)
  useSetSentryUser()

  return (
    <div className="mx-auto w-260">
      <AppHeader
        leftSlot={
          <DayTabs
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            hasContentByDay={hasContentByDay}
          />
        }
        rightSlot={<UserMenu />}
      />

      <CardsPanel
        initialCards={initialCards}
        selectedDay={selectedDay}
      />
    </div>
  )
}
