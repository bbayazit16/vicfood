import moment from "moment-timezone"

export default class TorontoDate {
    private momentInstance: moment.Moment

    private constructor(date?: string | Date) {
        this.momentInstance = moment.tz(date, "America/Toronto")
    }

    static now(): TorontoDate {
        return new TorontoDate()
    }

    static customDate(year: number, month: number, day: number, hour = 0, minute = 0): TorontoDate {
        return new TorontoDate(
            moment.tz({ year, month: month - 1, day, hour, minute }, "America/Toronto").toDate()
        )
    }

    getDateData(): { year: number; month: number; day: number } {
        return {
            year: this.momentInstance.year(),
            month: this.momentInstance.month() + 1,
            day: this.momentInstance.date(),
        }
    }

    getTimeData(): { day: number; hour: number; minute: number } {
        return {
            day: this.momentInstance.date(),
            hour: this.momentInstance.hour(),
            minute: this.momentInstance.minute(),
        }
    }

    dayStart(): void {
        this.momentInstance.startOf("day")
    }

    static dayOffset(date1: TorontoDate, date2: TorontoDate): number {
        return date1.momentInstance.diff(date2.momentInstance, "days")
    }

    getCurrentDayOfWeek(): number {
        return (this.momentInstance.day() + 6) % 7
    }

    getCurrentMonth(): number {
        return this.momentInstance.month()
    }

    getCurrentDayAsString(): string {
        return this.momentInstance.format("dddd")
    }

    equals(other: TorontoDate): boolean {
        return this.momentInstance.isSame(other.momentInstance)
    }

    isBefore(other: TorontoDate): boolean {
        return this.momentInstance.isBefore(other.momentInstance)
    }

    isAfter(other: TorontoDate): boolean {
        return this.momentInstance.isAfter(other.momentInstance)
    }

    isSameOrBefore(other: TorontoDate): boolean {
        return this.momentInstance.isSameOrBefore(other.momentInstance)
    }

    isSameOrAfter(other: TorontoDate): boolean {
        return this.momentInstance.isSameOrAfter(other.momentInstance)
    }

    clone(): TorontoDate {
        return new TorontoDate(this.momentInstance.clone().toDate())
    }

    addDays(days: number): void {
        this.momentInstance.add(days, "days")
    }

    subtractDays(days: number): void {
        this.momentInstance.subtract(days, "days")
    }

    toString(): string {
        return this.momentInstance.format()
    }

    format(formatString: string): string {
        return this.momentInstance.format(formatString)
    }
}
