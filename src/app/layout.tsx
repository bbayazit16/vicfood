import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import PlausibleProvider from "next-plausible"
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
            <head>
                <PlausibleProvider
                    domain="vicfood.ca"
                    customDomain="analytics.vicfood.ca"
                    selfHosted
                    trackOutboundLinks
                    taggedEvents

                    enabled
                    trackLocalhost
                    // If the prop `enabled` is not set, tracking is enabled in production.
                    // enabled={process.env.NODE_ENV === "production"}
                />
            </head>
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    )
}
