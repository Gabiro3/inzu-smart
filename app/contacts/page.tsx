import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getContactInfo } from "@/lib/data/company"
import { ContactsContent } from "./_components/contacts-content"
import ContactsLoading from "./loading"

async function ContactsData() {
  const contactInfo = await getContactInfo()
  
  const phones = contactInfo.filter((contact) => contact.type === "phone")
  const emails = contactInfo.filter((contact) => contact.type === "email")

  return <ContactsContent phones={phones} emails={emails} />
}

export default async function ContactsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase tracking-wide">
            Contacts
          </h1>
          
          <Suspense fallback={<ContactsLoading />}>
            <ContactsData />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}

