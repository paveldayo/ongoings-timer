'use client'

/**
 * @description Controls for list of cards: searching and sorting + extension slot
 */

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, SortAscIcon, SortDescIcon } from "lucide-react"
import { ReactNode } from "react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  ascSort: boolean
  setAscSort: Dispatch<SetStateAction<boolean>>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  renderActions?: () => ReactNode
}

export default function CardsListControls({
  ascSort,
  setAscSort,
  filter,
  setFilter,
  renderActions,
}: Props) {
  return (
    <div className="space-x-3 flex">
      <Field className="shadow-sm">
        <InputGroup className="border-zinc-300 rounded-sm">
          {/* TODO: Placeholders rotation */}
          <InputGroupInput value={filter} onChange={e => setFilter(e.target.value)} id="cards-search-filter" placeholder="Fate/Strange Fake II"/> 
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <Button onClick={() => setAscSort(prev => !prev)}>
        {ascSort ? <SortDescIcon /> :  <SortAscIcon />}
      </Button>

      {renderActions?.()}
    </div>
  )
}
