import Icons from "./Menu/Icons"

const ALL_TAGS: { icon: Tag; label: string }[] = [
    { icon: "GF", label: "Gluten Free" },
    { icon: "H", label: "Halal" },
    { icon: "VEG", label: "Vegetarian" },
    { icon: "DF", label: "Dairy Free" },
    { icon: "VGN", label: "Vegan" },
]

export default function Footer() {
    return (
        <footer className="p-4 border-t border-gray-800 dark:border-gray-200">
            <p className="text-center">
                VicFood is not affiliated with Victoria College or the University of Toronto. All
                provided data is as is, with no guarantee of accuracy.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
                {ALL_TAGS.map((tag, index) => (
                    <div key={index} className="flex flex-row items-center space-x-2">
                        <Icons icons={[tag.icon]} />
                        <span>{tag.label}</span>
                    </div>
                ))}
            </div>
        </footer>
    )
}
