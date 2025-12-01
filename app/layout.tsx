import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
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
    <html lang="en" className={`${bricolageGrotesque.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
