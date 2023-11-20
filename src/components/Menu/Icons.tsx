import { LuVegan } from "react-icons/lu" // Vegan
import { LuSalad } from "react-icons/lu" // Vegetarian
import { LuHeading } from "react-icons/lu" // Halal
import { LuWheatOff } from "react-icons/lu" // Gluten Free
import { LuMilkOff } from "react-icons/lu" // Dairy Free

type IconsProps = {
    icons: Tag[]
}

function getIcon(tag: Tag) {
    switch (tag) {
        case "H":
            return <LuHeading />
        case "GF":
            return <LuWheatOff />
        case "DF":
            return <LuMilkOff />
        case "VEG":
            return <LuSalad />
        case "VGN":
            return <LuVegan />
        default:
            return null
    }
}

export default function Icons({ icons }: IconsProps) {
    return (
        <div className="flex flex-row items-center space-x-2">
            {icons.map((icon, index) => (
                <div key={index}>{getIcon(icon)}</div>
            ))}
        </div>
    )
}
