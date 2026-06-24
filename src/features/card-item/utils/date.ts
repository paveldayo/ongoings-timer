/**
 * @fileoverview Utils for everything date-related
 */


/**
 * 
 * @param targetDate Unix date 
 * @returns How much days, hours, minutes and seconds fit in diff between `targetDate` andnow 
 */
export const parseDateToCountdown = (targetDate: Date) => {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  const absoluteDiff = Math.abs(diff)

  const seconds = Math.floor((absoluteDiff / 1000) % 60)
  const minutes = Math.floor((absoluteDiff / (1000 * 60)) % 60)
  const hours = Math.floor((absoluteDiff / (1000 * 60 * 60)) % 24)
  const days = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24))

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

export const formatCountdown = (targetDate: Date) => {
  const countdown = parseDateToCountdown(targetDate)
  const sign = targetDate.getTime() < Date.now() ? "-" : ""

  return `${sign}${countdown.days}:${countdown.hours}:${countdown.minutes}:${countdown.seconds}`
}
