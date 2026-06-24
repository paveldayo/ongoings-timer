import { CardFormInput } from "../model/cardFormSchema"

export const releaseDayOptions = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
] as const

export const DEFAULT_VALUES: CardFormInput = {
  title: "",
  player_url: "",
  episodes_total: 12,
  episodes_watched: 0,
  release_day_of_week: 6,
  release_time: "13:00",
} as const

export const placeholders = [
  'Lycoris Recoil',
  'Sousou no Frieren',
  'Tensura IV (2/2)',
  'Re:Zero IV (1/2)',
  'Overlord IV',
  '86',
  'Mushoku Tensei III',
  'Fate/Strange Fake (2/2)',
  'Call of The Night',
  'Horimiya: Piece',
  'Witch Hat Atelier',
]