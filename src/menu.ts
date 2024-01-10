import TorontoDate from "./TorontoDate"
import fallMenu from "./menu-fall.json"
import winterMenu from "./menu-winter.json"

export default function getMenu(date: TorontoDate): DayMeal | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu: menuIndex, day: dayIndex } = indices

    // Trusting that the generated menu has correct tags
    return (indices.isFall ? fallMenu : winterMenu)[menuIndex][dayIndex] as DayMeal
}

// Possible refactor: hardcode in switch case
export function getMenuIndices(
    date: TorontoDate
): { menu: number; day: number; isFall: boolean } | null {
    date.dayStart()
    let startDate = TorontoDate.customDate(2024, 1, 8)
    let isFall = false

    if (date.isBefore(startDate)) {
        startDate = TorontoDate.customDate(2023, 9, 4)
        isFall = true
    }

    const fallLastMeal = TorontoDate.customDate(2023, 12, 20)
    const winterFirstMeal = TorontoDate.customDate(2024, 1, 8)
    const winterLastMeal = TorontoDate.customDate(2024, 5, 1)

    if ((date.isAfter(fallLastMeal) && date.isBefore(winterFirstMeal)) || date.isAfter(winterLastMeal)) return null

    const dayDifference = TorontoDate.dayOffset(date, startDate)

    let menuIndex = Math.floor(dayDifference / 7) % 3

    const dayIndex = date.getCurrentDayOfWeek()

    if (menuIndex < 0 || menuIndex > 2) return null
    if (dayIndex < 0 || dayIndex > 6) return null

    return { menu: menuIndex, day: dayIndex, isFall }
}
