type MenuItem = {
    foodtype: "entree" | "vegeterian_entree" | "byoglutenfree" | "sides" | "soups"
    item: string
    tags: ("GF" | "H" | "VEG" | "DF" | "VGN")[]
}

type DayMeal = {
    lunch: MenuItem[]
    dinner: MenuItem[]
}

type Menu = DayMeal[][]
