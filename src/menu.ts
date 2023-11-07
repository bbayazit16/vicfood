import menu from "./menu.json"

export default function getTodaysMenu(): DayMeal | null {
    return getMenu(currentDayUTC())
}

export function currentDayUTC() {
    const date = new Date()

    date.setUTCHours(0)
    date.setUTCMinutes(0)
    date.setUTCSeconds(0)
    date.setUTCMilliseconds(0)

    return date
}

function getMenuIndices(date: Date): { menu: number; day: number } {
    let startDate = new Date("2023-09-04")

    let timeDifference = date.getTime() - startDate.getTime()

    let dayDifference = timeDifference / (1000 * 3600 * 24)

    return { menu: Math.floor(dayDifference / 7) % 3, day: date.getDay() }
}

function getMenu(date: Date): DayMeal | null {
    const { menu: menuIndex, day: dayIndex } = getMenuIndices(date)

    if (menuIndex < 0 || menuIndex > 2) return null
    if (dayIndex < 0 || dayIndex > 6) return null

    // Trusting that generated menu has correct tags
    return menu[menuIndex][dayIndex] as DayMeal
}
