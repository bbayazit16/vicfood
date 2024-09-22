"use client"

import Button from "@/components/Button"
import { FALL_FIRST_MEAL, FALL_LAST_MEAL, WINTER_FIRST_MEAL } from "@/lib/constants"
import TorontoDate from "@/lib/TorontoDate"

import useMenuChoice from "@/hooks/useMenuChoice"
import DatePicker from "@/components/DatePicker"
import getDayString from "@/lib/dateString"
import PreferenceSelector from "./PreferenceSelector"

export default function MenuPicker() {
    const { dailyMenu, day, setDay } = useMenuChoice()

    const [_, weekString] = getDayString(day) || ["", ""]

    return (
        <div className="flex flex-row justify-between items-center sm:m-2 md:m-4">
            <Button
                onClick={() =>
                    setDay((day: TorontoDate) => {
                        if (day.isSameDay(FALL_FIRST_MEAL)) return day
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

            <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-center m-auto">
                    {/* <span className="text-center text-sm md:text-base">{dayString}</span> */}
                    <DatePicker />
                    <span className="mx-2 hidden md:inline">{dailyMenu ? "|" : ""}</span>
                    <span className="text-center text-sm md:text-base">{weekString}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center m-auto space-x-2">
                    <span className="text-sm">Only show: </span><PreferenceSelector />
                </div>
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
