import { getMenuIndices } from "./menu"
import TorontoDate from "./TorontoDate"

export default function getDayString(date: TorontoDate): string[] | null {
    const indices = getMenuIndices(date)

    if (!indices) return null

    const { menu } = indices

    const dayOfWeek = date.getCurrentDayAsString()
    const { day, month } = date.getDateData()

    return [`${dayOfWeek} ${month}/${day}`, `Week ${menu + 1} Menu`]
}
