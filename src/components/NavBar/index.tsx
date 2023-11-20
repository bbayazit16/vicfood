import Link from "next/link"
import Time from "./time"

export default function NavBar() {
    const verticalBar = <span className="hidden sm:inline mx-2">|</span>

    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between w-full p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                <Link href="/">vicfood.ca</Link>
                <span>{verticalBar}Burwash Dining Hall</span>
            </div>
            <div className="flex flex-row">
                <Time />
            </div>
        </nav>
    )
}
