import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "INZU SMART - Building smarter, living better",
  description: "Architecture and construction solutions company supported by an AI-powered digital platform. Making smart, affordable, and culturally relevant housing accessible across Africa.",
  icons: {
    icon: "/logo.png"
  },
  openGraph: {
    title: "INZU SMART - Building smarter, living better",
    description: "Architecture and construction solutions company supported by an AI-powered digital platform. Making smart, affordable, and culturally relevant housing accessible across Africa.",
    images: [
      { url: "/logo.png" }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
