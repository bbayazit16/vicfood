type MenuProps = {
    menu: DayMeal
}

export default function Menu({ menu }: MenuProps) {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Lunch Menu</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Food Type</th>
                        <th className="px-4 py-2">Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.lunch.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.item}</td>
                            <td className="border px-4 py-2">{item.foodtype}</td>
                            <td className="border px-4 py-2">
                                {item.tags.length > 0 ? item.tags.join(", ") : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-2xl font-semibold mt-4">Dinner Menu</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Food Type</th>
                        <th className="px-4 py-2">Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.dinner.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.item}</td>
                            <td className="border px-4 py-2">{item.foodtype}</td>
                            <td className="border px-4 py-2">
                                {item.tags.length > 0 ? item.tags.join(", ") : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
