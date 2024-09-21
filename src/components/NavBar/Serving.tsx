"use client"

import TorontoDate from "@/lib/TorontoDate"
import useTime from "@/hooks/useTime"

const serving = (what: string) => (
    <span>
        Currently Serving: <span className="font-bold">{what}</span>
    </span>
)

const soonServing = (what: string, when: string) => (
    <span>
        Closed -{" "}
        <span className="font-bold">
            {what} at {when}
        </span>
    </span>
)

const closed = () => <span className="font-bold">Closed</span>

function currentlyServing(date: TorontoDate) {
    if (date.isWeekday()) {
        if (date.timeBetween(7, 30, 10, 30)) {
            return serving("Breakfast")
        } else if (date.timeBetween(10, 30, 11, 0)) {
            return serving("Light Breakfast")
        } else if (date.timeBetween(11, 0, 15, 30)) {
            return serving("Lunch")
        } else if (date.timeBetween(15, 30, 16, 0)) {
            return soonServing("Dinner", "4:00 PM")
        } else if (date.timeBetween(16, 0, 19, 30)) {
            return serving("Dinner")
        } else {
            return closed()
        }
    } else {
        if (date.timeBetween(10, 0, 14, 30)) {
            return serving("Brunch")
        } else if (date.timeBetween(14, 30, 16, 0)) {
            return soonServing("Dinner", "4:00 PM")
        } else if (date.timeBetween(16, 0, 19, 30)) {
            return serving("Dinner")
        } else {
            return closed()
        }
    }
}

export default function Serving() {
    const date = useTime()

    return <div>{currentlyServing(date)}</div>
}
