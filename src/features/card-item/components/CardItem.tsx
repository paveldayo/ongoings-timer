'use client' // Temp!
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
import { ReactElement, useEffect, useState } from "react"
import { parseDateToCountdown } from "../utils"
import { useRouter } from "next/navigation";
import { deleteCard } from "../actions/deleteCard"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {
  const [countdown, setCountdown] = useState(parseDateToCountdown(new Date(card.next_episode_at)))

  useEffect(() => {
    const x =setInterval(() => {
      setCountdown(parseDateToCountdown(new Date(card.next_episode_at )))
    }, 1000)

    return () => {
      clearInterval(x)
    }
  })

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
              onClick={() => console.log('- clicked!')}
            >
              <MinusIcon className="size-4.5"/>
            </Button>
            {/* TODO: Lover card transparency if watched */}
            <span className="text-xl font-mono tracking-widest">
              {card.episodes_watched}/{card.episodes_total}
            </span>
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => console.log('+ clicked!')}
            >
              <PlusIcon className="size-4.5"/>
            </Button>
          </span>
        </div>
        <div className="grow-5 basis-0">
          <span className="text-4xl font-mono font-semibold tracking-wide break-keep">
            {countdown.days}:{countdown.hours}:{countdown.mins}:{countdown.seconds}
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
  const handleDelete = (id: string) => {
    deleteCard(id)
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
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