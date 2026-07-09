'use client'

import Link from "next/link"
import { MoveLeftIcon } from "lucide-react"

import { Card } from "@/entities/card/types"
import UserMenu from "@/features/user-menu/components/UserMenu"
import AppHeader from "@/widgets/app-header/components/AppHeader"
import { ArchivedCardsPanel } from "@/widgets/archived-cards-panel/components/ArchivedCardsPanel"

interface Props {
  initialCards: Card[]
}

export default function ArchiveScreen({ initialCards }: Props) {
  return (
    <div className="mx-auto w-260">
      <AppHeader
        leftSlot={<GoBack />}
        rightSlot={<UserMenu />}
      />

      <ArchivedCardsPanel initialCards={initialCards} />
    </div>
  )
}

function GoBack() {
  return (
    <Link href="/cards-list" className="flex gap-2 cursor-pointer hover:underline">
      <MoveLeftIcon /> Back to list
    </Link>
  )
}
