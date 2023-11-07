import Menu from "@/components/Menu"
import getTodaysMenu from "@/menu"

export default function Home() {
    const todaysMenuFORCED = getTodaysMenu()!

    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            {/* {JSON.stringify(getTodaysMenu()!)} */}

            <Menu menu={todaysMenuFORCED} />
        </main>
    )
}
