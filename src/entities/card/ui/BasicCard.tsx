'use client'

import party from 'party-js'
import Image from "next/image"
import { toast } from "sonner"
import { ReactNode, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/utils/shadcn/utils"
import { Card } from "@/entities/card/types"
import { Button } from "@/components/ui/button"
import { getNextEpisodeAt } from "@/entities/card/utils/getNextEpisodeAt"

import { useNow } from "@/entities/card/hooks"
import { formatCountdown, isWatched } from '@/entities/card/utils'
import { changeWatched } from '@/entities/card/actions'

interface Props {
  card: Card,
  actionsSlot?: ReactNode
}

/**
 * @description One of many possible UI representations for Card entity.
 * Don't have any business logic, but has slot for actions.
 * If actions will use other features, it's probably a good idea to wrap this component into widget and compose BL there.
 */
export default function BasicCard({ card, actionsSlot }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  
  const unixTimeNow = useNow()
  const countdown = useMemo(() => {
    const now = new Date(unixTimeNow)
    const nextEpisodeAt = getNextEpisodeAt({
      releaseDayOfWeek: card.release_day_of_week,
      releaseTime: card.release_time,
      now,
    })

    return formatCountdown(new Date(nextEpisodeAt))
  }, [card.release_day_of_week, card.release_time, unixTimeNow])

  const handleWatchedChange = async (id: string, diff: -1 | 1) => {
    const result = await changeWatched(id, diff)
    
    if (!result.success) {
      toast.error(result.error)
      return
    }

    router.refresh()

    if (card.episodes_watched === card.episodes_total - 1) {
      party.confetti(cardRef.current!, {
        count: 100,
        spread: 50
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "h-60 border rounded-md overflow-hidden shadow-[-3px_4px_10px_0_rgba(0,0,0,0.25)] flex transition-all hover:opacity-100",
        { "opacity-70 h-25": isWatched(card) },
      )}
    >
      <Image
        src={`/api/images/${card.image_key}`}
        alt="Ado-san :з"
        width={300}
        height={580}
        sizes="100vw"
        // sizes="(max-width: 768px) 100vw, 600px"
        className={cn(
          "object-cover aspect-5/7 w-auto h-full",
        )}
        quality={100}
        loading="eager"
      />
      <div className="p-5 grow gap-2 flex items-center justify-evenly">
        <div className="grow-5 shrink-0 basis-0 min-w-auto flex flex-col items-start">
          {/* TODO: Add formatting when rendering title (capitalize words, uppercase roman numerals etc) */}
          <a
            className="mb-2 text-xl font-semibold text-center"
            href={card.player_url || undefined}
          >{card.title}</a>
          <span className="text-[#9494a2] flex items-center gap-2.5">
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => handleWatchedChange(card.id, -1)}
            >
              <MinusIcon className="size-4.5" />
            </Button>
            <span className="text-xl font-mono tracking-widest">
              {card.episodes_watched}/{card.episodes_total}
            </span>
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => handleWatchedChange(card.id, 1)}
            >
              <PlusIcon className="size-4.5" />
            </Button>
          </span>
        </div>
        <div className={cn(
          "grow-5 basis-0",
          { "hidden": isWatched(card) }
        )}>
          <span className="text-4xl font-mono font-semibold tracking-wide break-keep" suppressHydrationWarning>
            {countdown}
          </span>
        </div>
        <div>

        {actionsSlot}
        
          {/* <CardItemActions
            card={card}
            trigger={
              <Button variant='ghost'>
                <MoreVerticalIcon className="focus-within:outline-0" />
              </Button>
            }
          /> */}
        </div>
      </div>
    </div>
  )
}
