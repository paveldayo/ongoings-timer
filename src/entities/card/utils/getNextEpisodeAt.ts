interface Params {
  releaseDayOfWeek: number
  releaseTime: string
  now?: Date
}

export function getNextEpisodeAt({
  releaseDayOfWeek,
  releaseTime,
  now = new Date(),
}: Params) {
  const [hours, minutes] = releaseTime.split(":").map(Number)
  const nextEpisodeAt = new Date(now)
  let dayOffset = (releaseDayOfWeek - now.getDay() + 7) % 7

  nextEpisodeAt.setHours(hours, minutes, 0, 0)

  if (dayOffset === 0 && nextEpisodeAt.getTime() <= now.getTime()) {
    dayOffset = 7
  }

  nextEpisodeAt.setDate(now.getDate() + dayOffset)
  nextEpisodeAt.setHours(hours, minutes, 0, 0)

  return nextEpisodeAt.getTime()
}
