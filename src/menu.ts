import menu from "./menu.json"

/* export default function getTodaysMenu(): DayMeal | null {
    return getMenu(currentDayUTC())
} */

export default function getMenu(date: Date): DayMeal | null {
    setToDayStart(date)
    return _getMenu(date)
}

export function currentDayUTC() {
    const date = new Date()
    setToDayStart(date)

    return date
}

// Possible refactor: hardcode in switch case
export function getMenuIndices(date: Date): { menu: number; day: number } | null {
    if (date.getTime() > new Date("2023-12-25").getTime()) return null

    let startDate = new Date("2023-09-04")

    let timeDifference = date.getTime() - startDate.getTime()

    let dayDifference = timeDifference / (1000 * 3600 * 24)

    const menuIndex = Math.floor(dayDifference / 7) % 3
    const dayIndex = date.getDay()

    if (menuIndex < 0 || menuIndex > 2) return null
    if (dayIndex < 0 || dayIndex > 6) return null

    return { menu: menuIndex, day: dayIndex }
}

function _getMenu(date: Date): DayMeal | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu: menuIndex, day: dayIndex } = indices

    // Trusting that the generated menu has correct tags
    return menu[menuIndex][dayIndex] as DayMeal
}

export function setToDayStart(date: Date) {
    date.setUTCHours(0)
    date.setUTCMinutes(0)
    date.setUTCSeconds(0)
    date.setUTCMilliseconds(0)
}
