type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            className="border-2 border-black rounded-xl p-2 duration-300 transition-all hover:scale-105"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
