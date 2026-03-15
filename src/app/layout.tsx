import type { Metadata } from "next"
import {
  Cormorant_Garamond,
  Inter,
  Playfair_Display,
} from "next/font/google"

import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
})

export const metadata: Metadata = {
  title: "Calm Living | Design & Mindfulness Blog",
  description: "A premium blog platform built with Next.js and Shadcn.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
