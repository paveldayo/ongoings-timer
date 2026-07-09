'use client'

import { Card } from "@/entities/card/types";
import BasicCard from "@/entities/card/ui/BasicCard";
import CardActions from "./CardActions";

interface Props {
  card: Card
}

/**
 * @description Takes one of Card entity UI representations and combines it with arbitrary set of actions
 */
export function ArchivedCardItem({ card }: Props) {
  return (
    <>
      <BasicCard
        card={card}
        actionsSlot={ <CardActions card={card} /> }
      />
    </>
  )
}