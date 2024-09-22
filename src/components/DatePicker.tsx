"use client"

import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useMenuChoice from "@/hooks/useMenuChoice"
import getDayString from "@/lib/dateString"
import TorontoDate from "@/lib/TorontoDate"

function toTorontoDate(date: Date) {
    return TorontoDate.customDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

function fromTorontoDate(date: TorontoDate) {
    return new Date(date.year(), date.month() - 1, date.day())
}

export default function DatePicker() {
    const { day, setDay } = useMenuChoice()

    const dayString = getDayString(day)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="text-center text-sm md:text-sm">
                        {dayString ? dayString[0] : "No menu available"}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={fromTorontoDate(day)}
                    onSelect={(day?: Date) => {
                        if (day) {
                            setDay(toTorontoDate(day))
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
