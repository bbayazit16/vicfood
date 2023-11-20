"use client"

import Button from "@/components/Button"
import Menu from "@/components/Menu"
import getDayString from "@/formattime"
import getMenu from "@/menu"

import { currentDayUTC } from "@/menu"
import { useState } from "react"

export default function Home() {
    const [day, setDay] = useState(currentDayUTC())

    const menu = getMenu(day)

    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            <div className="flex flex-col md:flex-row justify-between m-4 space-y-4 md:space-y-0">
                <Button
                    onClick={() =>
                        setDay(prevDay => {
                            if (prevDay.getTime() < new Date(2023, 8, 4).getTime()) return prevDay
                            const newDay = new Date(prevDay)
                            newDay.setDate(newDay.getDate() - 1)
                            return newDay
                        })
                    }
                >
                    Previous Day
                </Button>

                <p className="flex items-center">{getDayString(day) || ""}</p>

                <Button
                    onClick={() =>
                        setDay(prevDay => {
                            if (!menu) return prevDay
                            const newDay = new Date(prevDay)
                            newDay.setDate(newDay.getDate() + 1)
                            return newDay
                        })
                    }
                >
                    Next Day
                </Button>
            </div>
            {menu ? (
                <Menu menu={menu} />
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Menu Not Available 🥲</h1>
                    <p className="text-lg">Check back later!</p>
                </div>
            )}
        </main>
    )
}
