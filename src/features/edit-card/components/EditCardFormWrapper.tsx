'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CardForm from "@/entities/card/ui/CardForm"
import { Card } from "@/entities/card/types"
import { toCardFormInput } from "@/entities/card/utils/toCardFormInput"
import { updateCard } from "../actions/updateCard"

interface Props {
  card: Card
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCardFormWrapper({ card, open, onOpenChange }: Props) {
  const defaultValues = toCardFormInput(card)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='min-w-1/2'>
        <DialogHeader>
          <DialogTitle className="text-center mb-3">Edit show</DialogTitle>
          <CardForm
            defaultValues={defaultValues}
            onSubmit={(formData) => updateCard(card.id, formData)}
            onSuccess={() => onOpenChange(false)}
            submitLabel="Save changes"
            submittingLabel="Saving..."
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
