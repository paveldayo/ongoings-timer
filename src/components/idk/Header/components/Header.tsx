'use client'

import { Menu, LogOut, Settings, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/shadcn/utils'
import { useSelectedDay } from '@/hooks/useSelectedDay'

const getTodayIndex = () => 0 // TODO: fix 
// const getTodayIndex = () => new Date().getDay() 

const days = [
  { short: 'S', full: 'Sunday' },
  { short: 'M', full: 'Monday' },
  { short: 'T', full: 'Tuesday' },
  { short: 'W', full: 'Wednesday' },
  { short: 'T', full: 'Thursday' },
  { short: 'F', full: 'Friday' },
  { short: 'S', full: 'Saturday' },
]

//Mock
const contentByDay = [true, true, false, true, false, true, false] 

export default function Header() {
  // const [activeTabIndex, setActiveTabIndex] = useState(getTodayIndex())
  const { selectedDay: activeTabIndex, setSelectedDay: setActiveTabIndex} = useSelectedDay()

  const todayIndex = getTodayIndex()

  const handleLogout = async () => {
    console.log('Logging out...')
  }

  return (
    <header className="flex items-center justify-between px-3 py-4 mb-3">
      {/* Day Navigation */}
      <div className="flex items-center gap-1">
        {days.map((day, index) => {
          const isActive = activeTabIndex === index
          const isToday = index === todayIndex
          const hasContent = contentByDay[index]

          return (
            <Button
              key={`nav-btn-${index}`}
              size="sm"
              variant={isActive ? 'default' : 'ghost'}
              className="relative h-9 w-9 p-0 text-sm font-medium focus-visible:ring-0 focus-visible:shadow-md"
              title={day.full}
              onClick={() => setActiveTabIndex(index)}
              aria-pressed={isActive}
            >
              {day.short}

              {/* Current day of the week indicator (top) */}
              {isToday && (
                // Example with cn utility
                <span className={cn("absolute top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full", isActive ? "bg-primary-foreground" : "bg-primary")} />
              )}

              {/* Has content indicator (bottom) */}
              {hasContent && (
                <span
                  className={
                    isActive 
                      ? "bg-primary-foreground absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full" 
                      : "bg-primary absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                  }
                />
              )}
            </Button>
          )
        })}
      </div>

      {/* Dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }>
          
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Info className="mr-2 h-4 w-4" />
            {/* How to use, certain features etc */}
            <span>About</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}