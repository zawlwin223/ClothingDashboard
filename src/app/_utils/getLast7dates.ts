export function getLast7dates(): string[] {
  const today = new Date()
  const last7Dates: string[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const formattedDate = date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    last7Dates.push(formattedDate)
  }

  return last7Dates.reverse() // Reverse to have the oldest date first
}
