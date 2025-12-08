export type PropertyFeature = {
  title: string
  description: string
  icon?: "home" | "lock" | "leaf" | "star"
}

export type PropertyRecord = {
  id: string
  title: string
  location: string
  price?: number | null
  currency?: string
  bedrooms?: number | null
  bathrooms?: number | null
  area?: string | null
  category?: string | null
  description?: string | null
  thumbnail_url: string
  gallery_urls: string[]
  features?: PropertyFeature[] | null
  created_at?: string
}

export type Property = {
  id: string
  title: string
  location: string
  price?: number
  priceLabel: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  category?: string
  description?: string
  image: string
  gallery: string[]
  features?: PropertyFeature[]
  createdAt?: string
}

