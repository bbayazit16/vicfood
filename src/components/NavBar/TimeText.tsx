import TorontoDate from "@/TorontoDate"

export default function TimeText() {
    const today = TorontoDate.now()

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
