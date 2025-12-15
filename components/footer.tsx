"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label={social.name}
              >
                {social.icon === "twitter" && <Twitter className="w-5 h-5" />}
                {social.icon === "linkedin" && <Linkedin className="w-5 h-5" />}
                {social.icon === "instagram" && <Instagram className="w-5 h-5" />}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
