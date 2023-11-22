import TorontoDate from "./TorontoDate"
import menu from "./menu.json"

export default function getMenu(date: TorontoDate): DayMeal | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu: menuIndex, day: dayIndex } = indices

    // Trusting that the generated menu has correct tags
    return menu[menuIndex][dayIndex] as DayMeal
}

// Possible refactor: hardcode in switch case
export function getMenuIndices(date: TorontoDate): { menu: number; day: number } | null {
    date.dayStart()
    if (TorontoDate.customDate(2023, 12, 20).isBefore(date)) return null

    const startDate = TorontoDate.customDate(2023, 9, 4)

    const dayDifference = TorontoDate.dayOffset(date, startDate)

    let menuIndex = Math.floor(dayDifference / 7) % 3

    const dayIndex = date.getCurrentDayOfWeek()

    if (menuIndex < 0 || menuIndex > 2) return null
    if (dayIndex < 0 || dayIndex > 6) return null

    return { menu: menuIndex, day: dayIndex }
}
