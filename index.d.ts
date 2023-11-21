type Tag = "GF" | "H" | "VEG" | "DF" | "VGN"

type MenuItem = {
    foodtype: "entree" | "vegeterianentree" | "byoglutenfree" | "sides" | "soups"
    item: string
    tags: Tag[]
}

type DayMeal = {
    lunch: MenuItem[]
    dinner: MenuItem[]
}

type Menu = DayMeal[][]

type IGReview = {
    lunch?: string
    dinner?: string
}
