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
  title: {
    default: "Calm Living | Design & Mindfulness Blog",
    template: "%s | Calm Living",
  },
  description: "A premium blog platform focused on intentional design, slow living, and mindfulness rituals.",
  openGraph: {
    title: "Calm Living",
    description: "A premium blog platform focused on intentional design, slow living, and mindfulness rituals.",
    url: "https://calm-living.com",
    siteName: "Calm Living",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calm Living",
    description: "A premium blog platform focused on intentional design, slow living, and mindfulness rituals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
