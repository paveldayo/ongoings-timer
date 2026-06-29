'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/entities/card/types"
import { MinusIcon, MoreVerticalIcon, PlusIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import { toast } from "sonner"
import CardItemActions from "./CardItemActions"
import { changeWatched } from "../actions/changeWatched"
import { formatCountdown, isWatched } from "../utils"
import { cn } from "@/utils/shadcn/utils"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {
  const router = useRouter()
  const [countdown, setCountdown] = useState<string | null>(null)

  // Start countdown
  useLayoutEffect(() => {
    const updateTimer = () => {
      setCountdown(formatCountdown(new Date(card.next_episode_at)))
    }
    updateTimer()

    const countdownIntervalId = setInterval(updateTimer, 1000)

    return () => {
      clearInterval(countdownIntervalId)
    }
  }, [card.next_episode_at])

  const handleWatchedChange = async (id: string, diff: -1 | 1) => {
    const result = await changeWatched(id, diff)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    router.refresh()
  }

  return (
    <div className={cn(
      "h-60 border rounded-md overflow-hidden shadow-[-3px_4px_10px_0_rgba(0,0,0,0.25)] flex transition-opacity hover:opacity-100",
      { "opacity-80 h-25": isWatched(card) },
    )}>
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
          <span className="text-4xl font-mono font-semibold tracking-wide break-keep">
            {countdown ?? '--:--:--:--'}
          </span>
        </div>
        <div>
          <CardItemActions
            card={card}
            trigger={
              <Button variant='ghost'>
                <MoreVerticalIcon className="focus-within:outline-0" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}
