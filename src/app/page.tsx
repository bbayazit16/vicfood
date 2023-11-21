"use client"

import TorontoDate from "@/TorontoDate"
import Button from "@/components/Button"
import Menu from "@/components/Menu"
import getMenu, { getMenuIndices } from "@/menu"

import { useState } from "react"

function getDayString(date: TorontoDate): string | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu } = indices

    const dayOfWeek = date.getCurrentDayAsString()
    const { day, month } = date.getDateData()

    return `${dayOfWeek} ${month}/${day} | Week ${menu + 1} Menu`
}

export default function Home() {
    const [day, setDay] = useState<TorontoDate>(TorontoDate.today())

    const menu = getMenu(day)

    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            <div className="flex flex-col md:flex-row justify-between m-4 space-y-4 md:space-y-0">
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
                    Previous Day
                </Button>

                <p className="flex items-center justify-center">{getDayString(day) || ""}</p>

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
                    Next Day
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
