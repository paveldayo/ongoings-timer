'use client'

import { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn/utils"

const days = [
  { short: 'S', full: 'Sunday' },
  { short: 'M', full: 'Monday' },
  { short: 'T', full: 'Tuesday' },
  { short: 'W', full: 'Wednesday' },
  { short: 'T', full: 'Thursday' },
  { short: 'F', full: 'Friday' },
  { short: 'S', full: 'Saturday' },
]

interface Props {
  selectedDay: number
  setSelectedDay: Dispatch<SetStateAction<number>>
  hasContentByDay: boolean[]
}

export default function DayTabs({ selectedDay, setSelectedDay, hasContentByDay }: Props) {
  const todayIndex = new Date().getDay()

  return (
    <div className="flex items-center gap-1">
      {days.map((day, index) => {
        const isActive = selectedDay === index
        const isToday = index === todayIndex
        const hasContent = hasContentByDay[index]

        return (
          <Button
            key={`day-tab-${index}`}
            size="sm"
            variant={isActive ? 'default' : 'ghost'}
            className="relative h-9 w-9 p-0 text-sm font-medium focus-visible:ring-0 focus-visible:shadow-md"
            title={day.full}
            onClick={() => setSelectedDay(index)}
            aria-pressed={isActive}
          >
            {day.short}

            {isToday && (
              <span
                className={cn(
                  "absolute top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                  isActive ? "bg-primary-foreground" : "bg-primary"
                )}
              />
            )}

            {hasContent && (
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                  isActive ? "bg-primary-foreground" : "bg-primary"
                )}
              />
            )}
          </Button>
        )
      })}
    </div>
  )
}
