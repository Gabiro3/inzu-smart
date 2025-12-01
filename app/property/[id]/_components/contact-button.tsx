"use client"

import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"

export function ContactButton() {
  return (
    <Button
      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full py-3"
      onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
    >
      Get in touch
    </Button>
  )
}

