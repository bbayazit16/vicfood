"use client"

import { WINTER_LAST_MEAL } from "@/lib/constants"
import getMenu from "@/lib/menu"
import TorontoDate from "@/lib/TorontoDate"
import { createContext, useState, ReactNode, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

interface MenuChoiceContextType {
    menuChoice: "lunch" | "dinner"
    day: TorontoDate
    setMenuChoice: Dispatch<SetStateAction<"lunch" | "dinner">>
    setDay: Dispatch<SetStateAction<TorontoDate>>
    dailyMenu: DayMeal | null
}

export const MenuChoiceContext = createContext<MenuChoiceContextType | null>(null)

interface MenuChoiceProviderProps {
    children: ReactNode
}

export default function MenuChoiceProvider({ children }: MenuChoiceProviderProps) {
    const [menuChoice, setMenuChoice] = useState<"lunch" | "dinner">("lunch")
    const [day, setDay] = useState<TorontoDate>(
        TorontoDate.now().isAfter(WINTER_LAST_MEAL) ? WINTER_LAST_MEAL : TorontoDate.now()
    )

    const [dailyMenu, setDailyMenu] = useState<DayMeal | null>(getMenu(day))

    useEffect(() => {
        setDailyMenu(getMenu(day))
    }, [day])

    return (
        <MenuChoiceContext.Provider value={{ menuChoice, day, setMenuChoice, setDay, dailyMenu }}>
            {children}
        </MenuChoiceContext.Provider>
    )
}
