import { useSyncExternalStore } from "react"

let now = Date.now()
const listeners = new Set<() => void>()

setInterval(() => {
  now = Date.now()
  listeners.forEach(l => l())
}, 1000)

const subscribe = (callback: () => void) => {
  // callback fn owned by react, if we call it - it conceptually means that
  // external state changed and our subscribers should call getSnapshot again to get up-to-date value.

  // Ususally callback called in like addEventListener, but we have something different in mind:
  // we wanna keep calling this callback once every second, and we CAN use setInterval here right away,
  // but it will create a billion intervals, and we want just one to rule them all. So...
  
  listeners.add(callback)
  // we just steal this callback and store it in the Set :D
  // Instead of addEventListener calling it whenever event happened, we'll do similar thing, but
  // it's not event, we just run global interval that will call all these stolen callbacks at the same time each second.
  // All components that called this hook will be notified external state has changed, so they need to call getSnapshot again

  return () => {
    listeners.delete(callback)
  }
}

/**
 * @description This hook prevents unknown amount of intervals being created.
 * All subscribers will get reactive var with current unix time, and updates stated by just one setInterval
 * @returns current unix time
 */
export function useNow() {
  const unixTimeNow =  useSyncExternalStore(
   subscribe,
    () => now,
    () => now
  )

  return unixTimeNow
}

