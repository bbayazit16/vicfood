"use client"

import Button from "@/components/Button"
import {
    FALL_FIRST_MEAL,
    FALL_LAST_MEAL,
    WINTER_FIRST_MEAL,
} from "@/lib/constants"
import TorontoDate from "@/lib/TorontoDate"
import { getMenuIndices } from "@/lib/menu"

import useMenuChoice from "@/hooks/useMenuChoice"

function getDayString(date: TorontoDate): string[] | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu } = indices

    const dayOfWeek = date.getCurrentDayAsString()
    const { day, month } = date.getDateData()

    return [`${dayOfWeek} ${month}/${day}`, `Week ${menu + 1} Menu`]
}

export default function MenuPicker() {
    const { dailyMenu, day, setDay } = useMenuChoice()

    const [dayString, weekString] = getDayString(day) || ["", ""]

    return (
        <div className="flex flex-row justify-between items-center sm:m-2 md:m-4">
            <Button
                onClick={() =>
                    setDay((day: TorontoDate) => {
                        if (day.isBefore(FALL_FIRST_MEAL)) return day

                        if (day.isSameDay(WINTER_FIRST_MEAL)) return FALL_LAST_MEAL

                        const prevDay = day.clone()
                        prevDay.subtractDays(1)
                        return prevDay
                    })
                }
            >
                <span className="text-sm hidden md:inline md:text-base">Previous Day</span>
                <span className="text-sm inline md:hidden md:text-base">Prev Day</span>
            </Button>

            <div className="flex flex-col md:flex-row items-center justify-center m-auto">
                <span className="text-center text-sm md:text-base">{dayString}</span>
                <span className="mx-2 hidden md:inline">{dailyMenu ? "|" : ""}</span>
                <span className="text-center text-sm md:text-base">{weekString}</span>
            </div>

            <Button
                onClick={() => {
                    setDay(prevDay => {
                        if (prevDay.isSameDay(FALL_LAST_MEAL)) return WINTER_FIRST_MEAL
                        if (!dailyMenu) return prevDay

                        const nextDay = prevDay.clone()
                        nextDay.addDays(1)
                        return nextDay
                    })
                }}
            >
                <span className="text-sm md:text-base">Next Day</span>
            </Button>
        </div>
    )
}
