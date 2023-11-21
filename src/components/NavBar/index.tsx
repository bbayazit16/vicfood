import Link from "next/link"

import TimeText from "./TimeText"
import ThemeHandler from "./ThemeHandler"

import { LuGithub } from "react-icons/lu"
import TorontoDate from "@/TorontoDate"

function currentlyServing() {
    const now = TorontoDate.now()
    const { day, hour, minute } = now.getTimeData()

    if (day >= 1 && day <= 5) {
        // Monday - Friday
        if (hour >= 7 && (hour < 10 || (hour === 10 && minute <= 30))) {
            return "Breakfast"
        } else if (hour === 10 && minute > 30) {
            return "Light Breakfast"
        } else if (hour >= 11 && hour < 15) {
            return "Lunch"
        } else if (hour >= 16 && (hour < 19 || (hour === 19 && minute <= 30))) {
            return "Dinner"
        }
    } else {
        // Saturday, Sunday & Holidays
        if (hour >= 10 && hour < 14) {
            return "Brunch"
        } else if (hour >= 16 && (hour < 19 || (hour === 19 && minute <= 30))) {
            return "Dinner"
        }
    }

    return "Nothing"
}

export default function NavBar() {
    const verticalBar = <span className="hidden sm:inline mx-2 select-none">|</span>

    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between w-full p-2 md:p-6 border-b md:text-base border-gray-800 dark:border-gray-200">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                <div className="flex flex-row space-x-2 md:space-x-0">
                    <Link href="/">vicfood.ca</Link>
                    <span>
                        {verticalBar}Burwash Dining Hall{verticalBar}
                    </span>
                </div>
                <div className="flex flex-row space-x-2 md:space-x-0">
                    Currently Serving:{" "}
                    <span className="font-semibold">&nbsp; {currentlyServing()}</span>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="flex flex-row items-center justify-center space-x-4 m-auto">
                    <a
                        href="https://github.com/bbayazit16/vicfood"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center space-x-2"
                    >
                        <LuGithub />
                        <span>GitHub</span>
                    </a>
                </div>
                <TimeText />
                <div className="m-auto text-2xl">
                    <ThemeHandler />
                </div>
            </div>
        </nav>
    )
}
