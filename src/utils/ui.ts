import { placeholders } from "@/constants"
import { randInt } from "./numbers"

/**
 * @fileoverview Utils for everything ui-related
 */

/**
 * 
 * @returns random show name from predefined pool
 */
export const getRandomShowName = () => {
  return placeholders[randInt(0, placeholders.length - 1)]
}