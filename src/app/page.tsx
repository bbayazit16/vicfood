"use client"

import TorontoDate from "@/TorontoDate"
import Button from "@/components/Button"
import Menu from "@/components/Menu"
import getMenu, { getMenuIndices } from "@/menu"

import { useState } from "react"

function getDayString(date: TorontoDate): string[] | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu } = indices

    const dayOfWeek = date.getCurrentDayAsString()
    const { day, month } = date.getDateData()

    return [`${dayOfWeek} ${month}/${day}`, `Week ${menu + 1} Menu`]
}

export default function Home() {
    const [day, setDay] = useState<TorontoDate>(TorontoDate.now())

    const menu = getMenu(day)

    const [dayString, weekString] = getDayString(day) || ["", ""]

    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            <div className="flex flex-row justify-between items-center sm:m-2 md:m-4">
                <Button
                    onClick={() =>
                        setDay(day => {
                            if (day.isBefore(TorontoDate.customDate(2023, 9, 4))) return day
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
                    <span className="mx-2 hidden md:inline">|</span>
                    <span className="text-center text-sm md:text-base">{weekString}</span>
                </div>

                <Button
                    onClick={() =>
                        setDay(prevDay => {
                            if (!menu) return prevDay

                            const nextDay = prevDay.clone()
                            nextDay.addDays(1)
                            return nextDay
                        })
                    }
                >
                    <span className="text-sm md:text-base">Next Day</span>
                </Button>
            </div>
            {menu ? (
                <Menu menu={menu} dateData={day.getDateData()} />
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Menu Not Available 🥲</h1>
                    <p className="text-lg">Check back later!</p>
                </div>
            )}
        </main>
    )
}
