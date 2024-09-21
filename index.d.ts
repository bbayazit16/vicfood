type Tag = "GF" | "H" | "VEG" | "DF" | "VGN"

type LunchDinnerFoodType =
    | "entree"
    | "vegetarian_entree"
    | "sides"
    | "gluten_free"
    | "soups"
    | "food_bar"

type LunchOrDinner = {
    [key in LunchDinnerFoodType]: Food[]
}

type Food = {
    name: string
    tags: Tag[]
}

type DayMeal = {
    lunch: LunchOrDinner
    dinner: LunchOrDinner
}

type IGReview = {
    lunch?: string
    dinner?: string
}
