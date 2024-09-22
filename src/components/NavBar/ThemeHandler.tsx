"use client"

import { useEffect, useState } from "react"

import { LuMoon, LuSun, LuLoader } from "react-icons/lu"
import { useTheme } from "next-themes"

export default function ThemeHandler() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <LuLoader />

    const currentTheme = theme === "system" ? resolvedTheme : theme
    const icon = currentTheme === "dark" ? <LuMoon /> : <LuSun />

    return (
        <button
            className="flex m-auto items-center justify-center"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
            {icon}
        </button>
    )
}
