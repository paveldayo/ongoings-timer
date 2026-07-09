'use client'

import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArchiveIcon, MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Card } from "@/entities/card/types"
import { deleteCard } from "@/entities/card/actions"

import { archiveCard } from "@/features/archive/actions"
import EditCardFormWrapper from "@/features/edit-card/components/EditCardFormWrapper"

interface Props {
  card: Card
}

type ActiveDialog = 'edit' | null

export default function CardActions({ card }: Props) {
  const router = useRouter()
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null)

  const handleArchive = async () => {
    const result = await archiveCard(card)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    toast.message(`Card "${card.title}" moved to archive.`, {
      action: (
        <Button
          onClick={() => router.push('/archive')}
          className='ml-auto cursor-pointer'
        >
          See
        </Button>
      )
    })

    router.refresh()
  }

  const handleDelete = async () => {
    if (!window.confirm("Delete this card?")) return

    const result = await deleteCard(card.id)

    if (!result.success) {
      toast.error(result.error)
      return
    }

    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant='ghost'>
              <MoreVerticalIcon className="focus-within:outline-0" />
            </Button>
          }
        />

        <DropdownMenuContent>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2Icon className="mr-2 size-4" />
                Delete
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setActiveDialog("edit")}>
              <PencilIcon className="mr-2 size-4" />
                Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleArchive}>
              <ArchiveIcon />
                Archive
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCardFormWrapper
        card={card}
        open={activeDialog === 'edit'}
        onOpenChange={(open) => setActiveDialog(open ? 'edit' : null)}
      />
    </>
  )
}
