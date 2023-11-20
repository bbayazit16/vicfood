"use client"

import { useEffect, useState } from "react"

import { LuMoon } from "react-icons/lu"
import { LuSun } from "react-icons/lu"

function detectTheme() {
    if (localStorage.getItem("lightTheme")) {
        document.documentElement.classList.remove("dark")
    } else {
        document.documentElement.classList.add("dark")
    }
}

export default function ThemeHandler() {
    const [icon, setIcon] = useState<JSX.Element>(<LuSun />)

    function updateTheme() {
        localStorage.getItem("lightTheme")
            ? localStorage.removeItem("lightTheme")
            : localStorage.setItem("lightTheme", "1")
        detectTheme()
        if (localStorage.getItem("lightTheme")) {
            setIcon(<LuMoon />)
        } else {
            setIcon(<LuSun />)
        }
    }

    useEffect(() => {
        detectTheme()
        if (localStorage.getItem("lightTheme")) {
            setIcon(<LuMoon />)
        } else {
            setIcon(<LuSun />)
        }
    }, [])

    return (
        <button className="flex m-auto items-center justify-center" onClick={updateTheme}>
            {icon}
        </button>
    )
}
