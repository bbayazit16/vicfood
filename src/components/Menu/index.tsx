"use client"

import Icons from "./Icons"
import MenuSwitch from "./MenuSwitch"
import Embed from "./Embed"
import TorontoDate from "@/lib/TorontoDate"

import { useEffect, useState } from "react"
import { usePlausible } from "next-plausible"
import useMenuChoice from "@/hooks/useMenuChoice"
import { WINTER_LAST_MEAL } from "@/lib/constants"
import getReviews from "@/actions/getReviews"

const FOOD_TYPE_TITLES: Record<LunchDinnerFoodType, string> = {
    entree: "Entrees",
    vegetarian_entree: "Vegetarian Entrees",
    sides: "Side Dishes",
    gluten_free: "Gluten-Free Options",
    soups: "Soups",
    food_bar: "Food Bar",
} as const

function shouldDisplayLunch(): boolean {
    const now = TorontoDate.now()
    const { year, month, day } = now.getDateData()
    const lunchEndTime = TorontoDate.customDate(year, month, day, 15, 30)

    return now.isBefore(lunchEndTime) // Before 3:30 p.m., display lunch
}

export default function Menu() {
    const [mealType, setMealType] = useState<"lunch" | "dinner" | "reviews">(
        shouldDisplayLunch() ? "lunch" : "dinner"
    )

    const [review, setReview] = useState<IGReview | undefined>()

    const plausible = usePlausible()

    const { dailyMenu, day } = useMenuChoice()

    useEffect(() => {
        getReviews(day.year(), day.month(), day.day()).then(review => {
            setReview(review)
        })
    }, [day])

    return (
        <div className="p-4">
            <div className="flex justify-center">
                <MenuSwitch
                    selectedMeal={mealType}
                    onSwitch={(meal: "lunch" | "dinner" | "reviews") => {
                        setMealType(meal)

                        if (meal === "reviews") {
                            plausible("ReviewViewed", {
                                props: {
                                    date: `${day.year()}-${day.month()}-${day.day()}`,
                                },
                            })
                            return
                        }
                    }}
                />
            </div>
            {mealType === "reviews" ? (
                <div className="m-auto">
                    <div className="flex justify-center">
                        <Embed review={review} />
                    </div>
                    <p className="text-center text-gray-800 dark:text-gray-200 text-sm">
                        Reviews supplied by Burwash Food Review.
                    </p>
                </div>
            ) : dailyMenu ? (
                (Object.keys(FOOD_TYPE_TITLES) as LunchDinnerFoodType[]).map(foodType => {
                    const itemsOfType = dailyMenu[mealType][foodType] || []

                    if (itemsOfType.length > 0) {
                        return (
                            <div key={foodType} className="mb-8">
                                <h3 className="text-lg font-bold uppercase tracking-wide mb-5">
                                    {FOOD_TYPE_TITLES[foodType]}
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-6">
                                    {itemsOfType.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="font-normal">{item.name}</span>
                                            <span className="flex items-center font-normal">
                                                <Icons icons={item.tags} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    return null
                })
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Menu Not Available 🥲</h1>
                    {day.isAfter(WINTER_LAST_MEAL) ? (
                        <p className="text-lg">
                            The academic year is over. Go back to check the old menu.
                        </p>
                    ) : (
                        <p className="text-lg">Check back later!</p>
                    )}
                </div>
            )}
        </div>
    )
}
