const BUSINESS_TIME_ZONE = "America/Sao_Paulo"

export function getTodayIsoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const dateParts = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  )

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`
}

export function addDaysToIsoDate(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + days))

  return date.toISOString().slice(0, 10)
}

export function formatDatePtBr(isoDate: string) {
  const [year, month, day] = isoDate.split("-")
  return `${day}/${month}/${year}`
}