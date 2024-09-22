"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { vegan, vegetarian, halal, glutenFree, dairyFree } from "./Menu/Icons"
import useMenuChoice from "@/hooks/useMenuChoice"

export default function PreferenceSelector() {
    const { setPreferences } = useMenuChoice()

    return (
        <ToggleGroup type="multiple" onValueChange={(values: Tag[]) => setPreferences(values)}>
            <ToggleGroupItem value="VGN" aria-label="Toggle Vegan">
                {vegan}
            </ToggleGroupItem>
            <ToggleGroupItem value="VEG" aria-label="Toggle Vegetarian">
                {vegetarian}
            </ToggleGroupItem>
            <ToggleGroupItem value="H" aria-label="Toggle Halal">
                {halal}
            </ToggleGroupItem>
            <ToggleGroupItem value="GF" aria-label="Toggle Gluten Free">
                {glutenFree}
            </ToggleGroupItem>
            <ToggleGroupItem value="DF" aria-label="Toggle Dairy Free">
                {dairyFree}
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
