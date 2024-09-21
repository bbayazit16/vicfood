import TorontoDate from "@/lib/TorontoDate"
import { useEffect, useState } from "react"

export default function useTime() {
    const [date, currentDate] = useState(TorontoDate.now())

    // Update the date every minute
    useEffect(() => {
        const interval = setInterval(() => {
            currentDate(TorontoDate.now())
        }, 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    return date
}
