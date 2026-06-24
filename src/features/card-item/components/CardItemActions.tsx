'use client'

import { useRouter } from "next/navigation"
import { ReactElement, useState } from "react"
import { ArchiveIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/entities/card/types"
import EditCardFormWrapper from "@/features/edit-card/components/EditCardFormWrapper"
import { deleteCard } from "../actions/deleteCard"

interface Props {
  card: Card
  trigger: ReactElement // Button for opening dropdown menu
}

type ActiveDialog = 'edit' | null

export default function CardItemActions({ card, trigger }: Props) {
  const router = useRouter()
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null)

  const handleDelete = async () => {
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
        <DropdownMenuTrigger render={trigger}/>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2Icon className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setActiveDialog("edit")}>
              <PencilIcon className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem disabled>
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
