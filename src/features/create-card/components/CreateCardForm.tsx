"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  FieldError,
  Field,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createCard } from "../actions/createCard"
import {
  CreateCardFormInput,
  createCardSchema,
  CreateCardValues,
  releaseDayOptions,
} from "../model/createCardSchema"

interface Props {
  onSuccess?: () => void
}

export function CreateCardForm({ onSuccess }: Props) {
  const router = useRouter()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const form = useForm<CreateCardFormInput, undefined, CreateCardValues>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      title: "",
      player_url: "",
      episodes_total: 12,
      episodes_watched: 0,
      release_day_of_week: 6,
      release_time: "18:00",
    }
  })


  async function onSubmit(_: CreateCardValues, event?: React.BaseSyntheticEvent) {
    if (!event) return

    const formData = new FormData(event.target as HTMLFormElement)
    const coverFile = formData.get("cover")

    if (coverFile instanceof File && coverFile.size > 0) {
      formData.set("cover", coverFile)
    } else {
      formData.delete("cover")
    }

    setSubmitError(null)
    const result = await createCard(formData)

    if (!result?.success) {
      setSubmitError(result?.error ?? "Failed to create card")
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

          <FieldSet>
            <FieldLegend variant="legend">General Data</FieldLegend>
            <Field>
              <FieldLabel htmlFor="form-cover">Cover image</FieldLabel>
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
                    placeholder="Fate/Strange Fake"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="player_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-player-url">
                    Player link
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-player-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/watch/show-name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>

          <FieldSet className="mt-5">
            <FieldLegend variant="legend">Watching Progress</FieldLegend>

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="episodes_total"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-episodes-total">
                      Total episodes
                    </FieldLabel>
                    <Input
                      name={field.name}
                      value={field.value === undefined || field.value === null ? "" : String(field.value)}
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        const nextValue = event.target.value
                        field.onChange(nextValue === "" ? "" : Number(nextValue))
                      }}
                      ref={field.ref}
                      id="form-episodes-total"
                      aria-invalid={fieldState.invalid}
                      placeholder="12"
                      autoComplete="off"
                      type="number"
                      min={1}
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
                      Already watched
                    </FieldLabel>
                    <Input
                      name={field.name}
                      value={field.value === undefined || field.value === null ? "" : String(field.value)}
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        const nextValue = event.target.value
                        field.onChange(nextValue === "" ? "" : Number(nextValue))
                      }}
                      ref={field.ref}
                      id="form-episodes-watched"
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                      autoComplete="off"
                      type="number"
                      min={0}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldSet>

          <FieldSet className="mt-5">
            <FieldLegend variant="legend">Release Schedule</FieldLegend>

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="release_day_of_week"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-release-day">Drops every</FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger
                        id="form-release-day"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select day">
                          {releaseDayOptions[Number(field.value)].label}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {releaseDayOptions.map((day) => (
                          <SelectItem key={day.value} value={String(day.value)}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="release_time"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-release-time">
                      At this time
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-release-time"
                      aria-invalid={fieldState.invalid}
                      type="time"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldSet>

          {submitError && (
            <FieldError>{submitError}</FieldError>
          )}

          <Field orientation="horizontal" className="mt-3 justify-end">
            <Button type="submit" form="form-rhf-demo" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create card"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
