import { currentDayUTC } from "@/menu"

function currentWeek(): number {
    const date = currentDayUTC()

    let startDate = new Date("2023-09-04")

    let timeDifference = date.getTime() - startDate.getTime()

    let dayDifference = timeDifference / (1000 * 3600 * 24)

    return (Math.floor(dayDifference / 7) % 3) + 1
}

export default function Time() {
    const date = currentDayUTC()
    const week = currentWeek()

    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)

    return (
        <span>
            Week {week}
            <span className="mx-2">|</span>
            {dayOfWeek}
        </span>
    )
}
