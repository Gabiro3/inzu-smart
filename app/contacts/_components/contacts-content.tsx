"use client"

import { Phone, Mail } from "lucide-react"
import type { ContactInfo } from "@/lib/types/company"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/i18n/translations"

interface ContactsContentProps {
  phones: ContactInfo[]
  emails: ContactInfo[]
}

export function ContactsContent({ phones, emails }: ContactsContentProps) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="space-y-6">
      {phones.length > 0 && (
        <div className="flex items-start space-x-4">
          <Phone className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            {phones.map((phone) => (
              <a
                key={phone.id}
                href={`tel:${phone.value}`}
                className="text-gray-700 hover:text-black transition-colors block text-lg"
              >
                {phone.value}
              </a>
            ))}
          </div>
        </div>
      )}

      {emails.length > 0 && (
        <div className="flex items-start space-x-4">
          <Mail className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            {emails.map((email) => (
              <a
                key={email.id}
                href={`mailto:${email.value}`}
                className="text-gray-700 hover:text-black transition-colors block text-lg"
              >
                {email.value}
              </a>
            ))}
          </div>
        </div>
      )}

      {phones.length === 0 && emails.length === 0 && (
        <p className="text-gray-600">{t.contacts.noContactInfo}</p>
      )}
    </div>
  )
}

