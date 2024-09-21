import { MenuChoiceContext } from "@/providers/MenuChoiceProvider"
import { useContext } from "react"

export default function useMenuChoice() {
    const context = useContext(MenuChoiceContext)

    if (!context) {
        throw new Error("useMenuChoice must be used within a MenuChoiceProvider")
    }

    return context
}
