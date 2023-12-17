"use client"

import Icons from "./Icons"
import MenuSwitch from "./MenuSwitch"
import getReviewsForDay from "@/firebase"
import Embed from "./Embed"
import TorontoDate from "@/TorontoDate"

import { useEffect, useState } from "react"
import { usePlausible } from "next-plausible"

const FOOD_TYPE_TITLES: { [key: string]: string } = {
    entree: "Entrees",
    vegetarianentree: "Vegetarian Entrees",
    byoglutenfree: "Gluten-Free Options",
    sides: "Side Dishes",
    soups: "Soups",
}

function shouldDisplayLunch(): boolean {
    const now = TorontoDate.now()
    const { year, month, day } = now.getDateData()
    const lunchEndTime = TorontoDate.customDate(year, month, day, 15, 30)

    return now.isBefore(lunchEndTime) // Before 3:30 p.m., display lunch
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
    dateData: {
        year: number
        month: number
        day: number
    }
}

export default function Menu({ menu, dateData }: MenuProps) {
    const [mealType, setMealType] = useState<"lunch" | "dinner" | "reviews">(
        shouldDisplayLunch() ? "lunch" : "dinner"
    )
    const [review, setReview] = useState<IGReview | undefined>()

    const plausible = usePlausible()

    useEffect(() => {
        getReviewsForDay(dateData.year, dateData.month, dateData.day).then(review => {
            setReview(review)
        })
    }, [dateData])

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
                                    date: `${dateData.year}-${dateData.month}-${dateData.day}`,
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
            ) : (
                Object.keys(FOOD_TYPE_TITLES).map(type => {
                    let itemsOfType = menu[mealType].filter(item => item.foodtype === type)

                    // if mealType is dinner, byoglutenfree and soups will always be missing.
                    // they should be added from the lunch menu
                    // This should optimally be handled in the scraping process, but I adopted
                    // this approach to keep the scraping process independent from the UI. Scraper
                    // should display the data as is, and the UI should handle the data as it sees fit.
                    // However, I will consider changing this in the future.
                    if (mealType === "dinner" && (type === "byoglutenfree" || type === "soups")) {
                        itemsOfType = [
                            ...itemsOfType,
                            ...menu.lunch.filter(item => item.foodtype === type),
                        ]
                    }

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
                })
            )}
        </div>
    )
}
