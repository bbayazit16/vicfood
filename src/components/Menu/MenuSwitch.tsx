type MenuSwitchProps = {
    selectedMeal: "lunch" | "dinner"
    onSwitch: (meal: "lunch" | "dinner") => void
}

export default function MenuSwitch({ selectedMeal, onSwitch }: MenuSwitchProps) {
    return (
        <div className="flex justify-center space-x-4 mb-6">
            {(["lunch", "dinner"] as const).map(meal => (
                <button
                    key={meal}
                    className="group relative rounded-md px-4 py-2 transition-all duration-300 ease-in-out"
                    onClick={() => onSwitch(meal)}
                >
                    <span className="uppercase">{meal}</span>
                    <div className="relative overflow-hidden h-0.5 w-full">
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-in-out`}
                            style={{ width: selectedMeal === meal ? "100%" : "0%" }}
                        />
                    </div>
                </button>
            ))}
        </div>
    )
}
