import { parseDateToCountdown } from "./parseDateToCountdown"

export const formatCountdown = (targetDate: Date) => {
  const countdown = parseDateToCountdown(targetDate)
  const sign = targetDate.getTime() < Date.now() ? "-" : ""

  return `${sign}${countdown.days}:${countdown.hours}:${countdown.minutes}:${countdown.seconds}`
}
