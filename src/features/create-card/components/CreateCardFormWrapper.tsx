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
import { CreateCardForm } from "./CreateCardForm";
import { PlusIcon } from "lucide-react";

export default function CreateCardFormWrapper() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant='outline' className='border-stone-300 shadow-sm/20'><PlusIcon/></Button>}></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-3">Add show</DialogTitle>
          <CreateCardForm onSuccess={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
