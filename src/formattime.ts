import { getMenuIndices, setToDayStart } from "./menu"

export default function getDayString(date: Date): string | null {
    setToDayStart(date)

    const indices = getMenuIndices(date)

    if (!indices) return null

    const dateClone = new Date(date.getTime())
    dateClone.setDate(date.getDate() + 1)

    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateClone)
    const month = dateClone.getMonth() + 1
    const day = dateClone.getDate()
    const menuWeek = indices.menu + 1

    return `${dayOfWeek} ${month}/${day} | Week ${menuWeek} Menu`
}
