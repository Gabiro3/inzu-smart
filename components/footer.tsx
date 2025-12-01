"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import { COMPANY_INFO, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 pb-16 border-b border-gray-800">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold mb-2">
              Stay updated with the latest news, promotions, and exclusive offers.
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-full px-6 py-3 min-w-[300px]"
                required
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                {social.icon === "twitter" && <Twitter className="w-5 h-5" />}
                {social.icon === "linkedin" && <Linkedin className="w-5 h-5" />}
                {social.icon === "instagram" && <Instagram className="w-5 h-5" />}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-8">Begin your path to success contact us today.</h3>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-3"
              onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
            >
              Book a Consultation
            </Button>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-gray-300">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-gray-300">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-gray-300">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <p>©2025 {COMPANY_INFO.name} • Design & Developed by GetNexus Templates</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
