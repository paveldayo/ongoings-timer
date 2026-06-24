'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react";
import CardForm from "@/entities/card/ui/CardForm";
import { createCard } from "../actions/createCard";

/**
 * @description Dialog component with state. No form itself. 
 */
export default function CreateCardFormWrapper() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant='outline' className='border-stone-300 shadow-sm/20'><PlusIcon/></Button>}></DialogTrigger>
      <DialogContent className='min-w-1/2'>
        <DialogHeader>
          <DialogTitle className="text-center mb-3">Add show</DialogTitle>
          <CardForm
            onSubmit={createCard}
            onSuccess={() => setOpen(false)}
            submitLabel="Create card"
            submittingLabel="Creating..."
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
