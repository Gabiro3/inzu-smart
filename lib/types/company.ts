export type CompanyInfo = {
  id: string
  name: string
  tagline: string | null
  phone: string | null
  email: string | null
  calendly_link: string | null
  founded: string | null
  locations: string | null
  vision: string | null
  mission: string | null
  purpose: string | null
  design_philosophy: string | null
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  slug: string
  name: string
  title: string
  description: string
  image: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ContactInfo = {
  id: string
  type: "phone" | "email" | "address" | "social" | string
  label: string | null
  value: string
  display_order: number
  is_primary: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CompanyInfoUpdate = Partial<Omit<CompanyInfo, "id" | "created_at" | "updated_at">>
export type ServiceUpdate = Partial<Omit<Service, "id" | "created_at" | "updated_at">>
export type ContactInfoUpdate = Partial<Omit<ContactInfo, "id" | "created_at" | "updated_at">>

