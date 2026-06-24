'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/entities/card/types"
import { MinusIcon, MoreVerticalIcon, PlusIcon } from "lucide-react"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactElement, useEffect, useLayoutEffect, useState } from "react"
import { formatCountdown } from "../utils"
import { useRouter } from "next/navigation";
import { deleteCard } from "../actions/deleteCard"
import { changeWatched } from "../actions/changeWatched"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {
  const router = useRouter()
  const [countdown, setCountdown] = useState<string | null>(null)

  useLayoutEffect(() => {
    const update = () => {
      setCountdown(formatCountdown(new Date(card.next_episode_at)))
    }
    update()
    
    const countdownIntervalId = setInterval(update, 1000)
    
    return () => {
      clearInterval(countdownIntervalId)
    }
  }, [card.next_episode_at])

  const handleWatchedChange = async (id: string, diff: -1 | 1) => {
    await changeWatched(id, diff)
    router.refresh()
  }

  return (
    <div className="h-60 border rounded-md overflow-hidden shadow-[-3px_4px_10px_0_rgba(0,0,0,0.25)] flex">
      <Image
        src={`/api/images/${card.image_key}`}
        alt="Ado-san :з"
        width={300}
        height={580}
        sizes="100vw"
        // sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover aspect-5/7 w-auto h-full"
        quality={100}
        loading="eager"
      />
      <div className="p-5 grow gap-2 flex items-center justify-evenly">
        <div className="grow-5 shrink-0 basis-0 min-w-auto flex flex-col items-start">
          {/* TODO: Add formatting when rendering title (capitalize words, uppercase roman numerals etc) */}
          <span className="mb-2 text-xl font-semibold text-center">{ card.title }</span>
          <span className="text-[#9494a2] flex items-center gap-2.5">
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => handleWatchedChange(card.id, -1)}
            >
              <MinusIcon className="size-4.5"/>
            </Button>
            {/* TODO: Lower card transparency if watched */}
            <span className="text-xl font-mono tracking-widest">
              {card.episodes_watched}/{card.episodes_total}
            </span>
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => handleWatchedChange(card.id, 1)}
            >
              <PlusIcon className="size-4.5"/>
            </Button>
          </span>
        </div>
        <div className="grow-5 basis-0">
          <span className="text-4xl font-mono font-semibold tracking-wide break-keep">
            {countdown ?? '--:--:--:--'}
          </span>
        </div>
        <div>
          <CardOptionsDropdown
            cardId={card.id}
            trigger={
              <Button variant='ghost'>
                <MoreVerticalIcon className="focus-within:outline-0"/>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}

function CardOptionsDropdown({ trigger, cardId}: {trigger: ReactElement, cardId: string}) {
  const router = useRouter()
  const handleDelete = async (id: string) => {
    await deleteCard(id)
    router.refresh();

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleDelete(cardId)}>Delete</DropdownMenuItem>
          <DropdownMenuItem disabled>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled>Archive (?)</DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
