import TorontoDate from "./TorontoDate"
import { FALL_FIRST_MEAL, FALL_LAST_MEAL, WINTER_FIRST_MEAL, WINTER_LAST_MEAL } from "./constants"
import burwashFallMenu from "./burwash-fall.json"
// import winterMenu from "./menu-winter.json"

export default function getMenu(date: TorontoDate): DayMeal | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu: menuIndex, day: dayIndex } = indices

    return {
        lunch: burwashFallMenu.lunch[menuIndex][dayIndex],
        dinner: burwashFallMenu.dinner[menuIndex][dayIndex],
    } as DayMeal
}

export function getMenuIndices(
    date: TorontoDate
): { menu: number; day: number; isFall: boolean } | null {
    date.dayStart()
    let startDate = FALL_FIRST_MEAL
    let isFall = false
    if (date.isBefore(FALL_FIRST_MEAL)) {
        startDate = TorontoDate.customDate(2023, 9, 4)
        isFall = true
    }

    if (
        (date.isAfter(FALL_LAST_MEAL) && date.isBefore(WINTER_FIRST_MEAL)) ||
        date.isAfter(WINTER_LAST_MEAL)
    )
        return null

    const dayDifference = TorontoDate.dayOffset(date, startDate)

    let menuIndex = Math.floor(dayDifference / 7) % 3

    const dayIndex = date.getCurrentDayOfWeek()

    if (menuIndex < 0 || menuIndex > 2) return null
    if (dayIndex < 0 || dayIndex > 6) return null

    return { menu: menuIndex, day: dayIndex, isFall }
}
