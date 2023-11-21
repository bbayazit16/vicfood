type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            className="border-2 border-black dark:border-white rounded-xl px-2 py-1 md:px-3 md:py-2 duration-300 transition-all hover:scale-105"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
