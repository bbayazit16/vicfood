"use client"

import { useEffect, useState } from "react"
import { LuMoon, LuSun } from "react-icons/lu"

function detectTheme() {
    if (localStorage.getItem("darkTheme")) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}

export default function ThemeHandler() {
    const [icon, setIcon] = useState<JSX.Element>(<LuMoon />)

    function updateTheme() {
        localStorage.getItem("darkTheme")
            ? localStorage.removeItem("darkTheme")
            : localStorage.setItem("darkTheme", "1")
        detectTheme()
        if (localStorage.getItem("darkTheme")) {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#18181B")
            setIcon(<LuSun />)
        } else {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffffff")
            setIcon(<LuMoon />)
        }
    }

    useEffect(() => {
        detectTheme()
        if (localStorage.getItem("darkTheme")) {
            setIcon(<LuSun />)
        } else {
            setIcon(<LuMoon />)
        }
    }, [])

    return (
        <button className="flex m-auto items-center justify-center" onClick={updateTheme}>
            {icon}
        </button>
    )
}
