import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import PlausibleProvider from "next-plausible"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import MenuChoiceProvider from "@/providers/MenuChoiceProvider"

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
        // suppressHydrationWarning required by next-themess
        <html lang="en" suppressHydrationWarning>
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
                <ThemeProvider enableSystem={false} attribute="class">
                    <div className="flex flex-col min-h-screen">
                        <NavBar />
                        <MenuChoiceProvider>{children}</MenuChoiceProvider>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
