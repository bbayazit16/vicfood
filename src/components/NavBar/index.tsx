import Link from "next/link"

import TimeText from "./TimeText"
import ThemeHandler from "./ThemeHandler"

import { LuGithub } from "react-icons/lu"
import Serving from "./Serving"

export default function NavBar() {
    const verticalBar = <span className="inline mx-2">|</span>
    const verticalBarHidden = <span className="hidden sm:inline mx-2">|</span>

    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between w-full p-2 md:p-6 border-b md:text-base border-gray-800 dark:border-gray-200">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                <div className="flex flex-row md:space-x-0">
                    <Link href="/">vicfood.ca</Link>
                    <span>
                        {verticalBar}Burwash Dining Hall{verticalBarHidden}
                    </span>
                </div>
                <Serving />
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

export const cache = "dynamic"
