"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createCard } from "../actions/createCard"

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title can't be blank")
    .max(300, "Title should be at most 300 characters"),
  episodes_total: z.coerce
    .number<number>()
    .max(5000, "Are you serious?)"),
  episodes_watched: z.coerce
    .number<number>()
    .max(5000, "Are you serious?)")
})

interface Props {
  onSuccess?: () => void
}

export function CreateCardForm({ onSuccess }: Props) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      episodes_total: 0,
      episodes_watched: 0,
    }
  })


  async function onSubmit(data: z.infer<typeof formSchema>, event?: React.BaseSyntheticEvent) {
    if (!event) return

    const formData = new FormData(event.target as HTMLFormElement)
    const coverFile = formData.get("cover")

    if (coverFile instanceof File && coverFile.size > 0) {
      console.log("File uploaded:", coverFile.name, coverFile.size)
    } else {
      formData.set("cover", "null")
    }
    
    const result = await createCard(formData)

    if (!result?.success) {
      return
    }

    form.reset()
    router.refresh()
    onSuccess?.()
  }

  return (
    <div>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-cover">Cover Image</FieldLabel>
            <Input
              id="form-cover"
              name="cover"
              type="file"
              accept="image/*"
            />
          </Field>

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">
                  Show title
                </FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kimetsu no Yaiba II"
                  autoComplete="off"

                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="episodes_total"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-episodes-total">
                  Total episodes
                </FieldLabel>
                <Input
                  {...field}
                  id="form-episodes-total"
                  aria-invalid={fieldState.invalid}
                  placeholder="12"
                  autoComplete="off"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <Controller
            name="episodes_watched"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-episodes-watched">
                  Watched episodes
                </FieldLabel>
                <Input
                  {...field}
                  id="form-episodes-watched"
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  autoComplete="off"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <Field orientation="horizontal" className="mt-3">
            <Button type="submit" form="form-rhf-demo">Create card</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
