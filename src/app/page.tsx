import Menu from "@/components/Menu"
import MenuPicker from "@/components/MenuPicker"

export default function Home() {
    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            <MenuPicker />
            <Menu />
        </main>
    )
}
