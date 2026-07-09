'use client'

import { ArchiveX } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/entities/card/types"
import { unarchiveCard } from "@/features/archive/actions"

interface Props {
  card: Card
}

export default function CardActions({ card }: Props) {
  const router = useRouter()

  const handleUnarchive = async () => {
    const result = await unarchiveCard(card)

    if (!result.success) {
      toast.error(result.error)
      return
    }
    
    toast.success("Done!")

    router.refresh()
  }

  return (
    <Button variant='ghost' className='cursor-pointer' onClick={handleUnarchive}>
      <ArchiveX className="focus-within:outline-0 scale-125" />
    </Button>
  )
}
