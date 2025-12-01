"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Phone } from "lucide-react"
import { COMPANY_INFO, NAVIGATION_ITEMS } from "@/lib/constants"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <Image src="/logo.png" alt="INZU SMART" width={64} height={64} />
            <span className="font-bold text-xl">{COMPANY_INFO.name}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>{COMPANY_INFO.phone}</span>
            </div>
            <Button onClick={() => setIsMenuOpen(true)} className="bg-black text-white rounded-full px-6">
              <Menu className="w-4 h-4 mr-2" />
              Menu
            </Button>
          </div>

          <Button onClick={() => setIsMenuOpen(true)} className="md:hidden bg-black text-white rounded-full" size="sm">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Mobile/Desktop Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 text-white animate-slide-in-right">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center space-x-2">
                  <Image src="/logo.png" alt="INZU SMART" width={64} height={64} className="bg-white" />
                  <span className="font-bold text-xl">{COMPANY_INFO.name}</span>
                </Link>
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="space-y-6">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl font-medium transition-colors hover:text-emerald-400 ${
                      index === 0 ? "text-emerald-400" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-12 space-y-4">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full py-3">
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-full py-3 bg-transparent"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
