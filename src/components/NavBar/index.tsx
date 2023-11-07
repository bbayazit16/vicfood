import Link from "next/link"

import Time from "./time"

export default function NavBar() {
    const verticalBar = <span className="mx-2">|</span>

    return (
        <nav className="flex items-center justify-between w-full p-6 border-b border-gray-800">
            <div className="flex flex-row">
                <Link href="/">vicfood.ca </Link>
                <span>{verticalBar}Burwash Dining Hall</span>
            </div>
            <div className="flex flex-row"><Time /></div>
        </nav>
    )
}
