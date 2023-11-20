import Icons from "./Icons"
import MenuSwitch from "./MenuSwitch"

import { useState } from "react"

const FOOD_TYPE_TITLES: { [key: string]: string } = {
    entree: "Entrees",
    vegeterianentree: "Vegetarian Entrees",
    byoglutenfree: "Gluten-Free Options",
    sides: "Side Dishes",
    soups: "Soups",
}

function getTorontoTime() {
    const torontoTime = new Date().toLocaleString("en-US", { timeZone: "America/Toronto" })
    return new Date(torontoTime)
}

function shouldDisplayLunch(): boolean {
    const now = getTorontoTime()
    const lunchEndTime = new Date(now)
    lunchEndTime.setHours(15, 30, 0, 0) // 3:30 p.m.

    return now < lunchEndTime // Before 3:30 p.m., display lunch
}

function normalizeTags(tags: Tag[], type: string): Tag[] {
    // add GF tag to gluten-free options if it already doesn't exist
    // this is required as burwash dining hall menu does not include
    // the gluten free tag for "BYO Gluten Free"
    // this is assuming every food in "BYO Gluten Free" is gluten free...
    if (type === "byoglutenfree") {
        return tags.includes("GF") ? tags : [...tags, "GF" as Tag]
    }
    return tags
}

type MenuProps = {
    menu: DayMeal
}

export default function Menu({ menu }: MenuProps) {
    const [mealType, setMealType] = useState<"lunch" | "dinner">(
        shouldDisplayLunch() ? "lunch" : "dinner"
    )

    return (
        <div className="p-4">
            <div className="flex justify-center">
                <MenuSwitch selectedMeal={mealType} onSwitch={setMealType} />
            </div>
            {Object.keys(FOOD_TYPE_TITLES).map(type => {
                const itemsOfType = menu[mealType].filter(item => item.foodtype === type)
                if (itemsOfType.length > 0) {
                    return (
                        <div key={type} className="mb-8">
                            <h3 className="text-lg font-bold uppercase tracking-wide mb-5">
                                {FOOD_TYPE_TITLES[type]}
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-6">
                                {itemsOfType.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="font-normal">{item.item}</span>
                                        <span className="flex items-center font-normal">
                                            <Icons icons={normalizeTags(item.tags, type)} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}
