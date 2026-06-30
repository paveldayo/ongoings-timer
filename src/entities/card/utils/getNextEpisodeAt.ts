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
  const dayOffset = (releaseDayOfWeek - now.getDay() + 7) % 7

  const nextEpisodeAt = new Date(now)
  nextEpisodeAt.setHours(hours, minutes, 0, 0)

  nextEpisodeAt.setDate(now.getDate() + dayOffset)
  nextEpisodeAt.setHours(hours, minutes, 0, 0)

  return nextEpisodeAt.getTime()
}
