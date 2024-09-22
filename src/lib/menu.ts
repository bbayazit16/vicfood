import TorontoDate from "./TorontoDate"
import {
    FALL_FIRST_MEAL,
    FALL_LAST_MEAL,
    WINTER_FIRST_MEAL,
    WINTER_LAST_MEAL,
} from "@/lib/constants"
import burwashFallMenu from "../burwash-fall.json"
// import winterMenu from "./menu-winter.json"

export default function getMenu(date: TorontoDate): DayMeal | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    let { menu: menuIndex, day: dayIndex } = indices

    // Update 2024-09-21: The original Victoria College website, which
    // has been now developed at 2024 Fall, (https://foodmenu.vicu.utoronto.ca/burwash-menu/),
    // has a bug where they display the next week's sunday on sundays.
    // For example, Week 1's Monday, ..., Saturday is displayed correctly, but after
    // Saturday, it displays Week 2's Sunday.
    // <Rant>I am not sure if they are aware of this bug. But, I will intentionally
    // cause this error in my algorithm below to match their bug
    // (funny how this works. If they had open-sourced it, I could've made a PR.
    // Yet, vicfood, being the source of truth, has to lie to conform to its
    // master's will)</Rant>
    // This is why I am adding the lines below.
    if (dayIndex === 6) {
        menuIndex = (menuIndex + 1) % 3
    }

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
        startDate = FALL_FIRST_MEAL
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
