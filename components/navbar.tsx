"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"
import { COMPANY_INFO, NAVIGATION_ITEMS } from "@/lib/constants"
import Image from "next/image"

const NAV_LINKS = [
  { name: "LANDSCAPE", href: "/projects?category=landscape" },
  { name: "ENGINEERING", href: "/projects?category=engineering" },
  { name: "ARCHITECTURE", href: "/projects?category=architecture" },
  { name: "PLANNING", href: "/projects?category=planning" },
  { name: "PROJECTS", href: "/projects" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/projects?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Image src="/logo.png" alt="INZU SMART" width={48} height={48} />
                  <span className="font-bold text-lg">{COMPANY_INFO.name}</span>
                </Link>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm lg:text-base font-light text-gray-500 uppercase tracking-wide hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Search and Sustainability */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Search */}
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 w-48 text-sm border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsSearchOpen(false)
                        setSearchQuery("")
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Desktop Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div
            className="fixed left-0 top-0 h-full w-full max-w-md bg-white animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Image src="/logo.png" alt="INZU SMART" width={48} height={48} />
                  <span className="font-bold text-lg">{COMPANY_INFO.name}</span>
                </Link>
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-light text-gray-600 uppercase tracking-wide hover:text-gray-900 transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/sustainability"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-light text-gray-600 uppercase tracking-wide hover:text-gray-900 transition-colors py-2"
                >
                  SUSTAINABILITY
                </Link>
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-light text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="bg-black text-white hover:bg-gray-800">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
