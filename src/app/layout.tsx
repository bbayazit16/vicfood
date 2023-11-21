import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "VicFood",
    description: "See the daily Burwash Dining Hall menu",
    icons: {
        shortcut: "/favicon.ico",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen dark:bg-zinc-900 dark:text-white">
                    <NavBar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    )
}
