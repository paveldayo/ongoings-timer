'use client'

import { ReactNode } from "react"

interface Props {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

export default function AppHeader({ leftSlot, rightSlot }: Props) {
  return (
    <header className="mb-3 flex items-center justify-between px-3 py-4">
      <div className="min-w-0 flex-1">
        {leftSlot}
      </div>
      <div className="ml-3 shrink-0">
        {rightSlot}
      </div>
    </header>
  )
}
