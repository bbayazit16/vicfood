"use client"

import TorontoDate from "@/lib/TorontoDate"
import useTime from "@/hooks/useTime"

export default function TimeText() {
    const today = useTime()

    const dayOffset = TorontoDate.dayOffset(today, TorontoDate.customDate(2023, 9, 4))
    const week = (Math.floor(dayOffset / 7) % 3) + 1

    return (
        <span>
            Week {week}
            <span className="mx-2">|</span>
            {today.getCurrentDayAsString()}
        </span>
    )
}
