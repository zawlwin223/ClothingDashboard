export const monthNames = [
  'January', // 0
  'February', // 1
  'March', // 2
  'April', // 3
  'May', // 4
  'June', // 5
  'July', // 6
  'August', // 7
  'September', // 8
  'October', // 9
  'November', // 10
  'December', // 11
]
export function getLast7months() {
  const today = new Date()
  const monthIndexArray: number[] = []
  const getLast7months: string[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    const monthIndex = date.getMonth() - i
    monthIndexArray.unshift(monthIndex)
  }
  monthIndexArray.forEach((val) => {
    const month = monthNames[val]
    getLast7months.push(month)
  })
  return getLast7months
}
