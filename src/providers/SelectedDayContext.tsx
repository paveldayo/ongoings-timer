'use client'

import { Dispatch, SetStateAction, useState, createContext } from "react"

export interface SelectedDayContext {
  selectedDay: number
  setSelectedDay: Dispatch<SetStateAction<number>>
}

export const SelectedDayContext = createContext<SelectedDayContext | undefined>(undefined)

export function SelectedDayProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())

  return (
    <SelectedDayContext.Provider value={{selectedDay, setSelectedDay}}>
      {children}
    </SelectedDayContext.Provider>
  )
}