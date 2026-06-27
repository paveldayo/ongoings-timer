'use client'

import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn/utils"
import { captureException } from '@sentry/nextjs'

const days = [
  { short: 'M', full: 'Monday', idx: 1 },
  { short: 'T', full: 'Tuesday', idx: 2 },
  { short: 'W', full: 'Wednesday', idx: 3 },
  { short: 'T', full: 'Thursday', idx: 4 },
  { short: 'F', full: 'Friday', idx: 5 },
  { short: 'S', full: 'Saturday', idx: 6 },
  { short: 'S', full: 'Sunday', idx: 0 },
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
      <Button onClick={() => {
        captureException(new Error("test error 1234"))
      }}>
        send err
      </Button>
      {days.map((day) => {
        
        const isActive = selectedDay === day.idx
        const isToday = day.idx === todayIndex
        const hasContent = hasContentByDay[day.idx]

        return (
          <Button
            key={`day-tab-${day.idx}`}
            size="sm"
            variant={isActive ? 'default' : 'ghost'}
            className="relative h-9 w-9 p-0 text-sm font-medium focus-visible:ring-0 focus-visible:shadow-md"
            title={day.full}
            onClick={() => setSelectedDay(day.idx)}
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
