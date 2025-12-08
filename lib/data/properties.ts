import "server-only"

import { cache } from "react"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import type { Property, PropertyRecord } from "@/lib/types/property"

const mapRecordToProperty = (record: PropertyRecord): Property => {
  const price = record.price ?? 0
  const bedrooms = record.bedrooms ?? 0
  const bathrooms = record.bathrooms ?? 0
  const area = record.area ?? "N/A"

  return {
    id: record.id,
    title: record.title,
    location: record.location,
    price: price > 0 ? price : undefined,
    priceLabel: price > 0 ? formatCurrency(price, record.currency) : "Price on request",
    bedrooms: bedrooms > 0 ? bedrooms : undefined,
    bathrooms: bathrooms > 0 ? bathrooms : undefined,
    area: area !== "N/A" ? area : undefined,
    category: record.category ?? undefined,
    description: record.description ?? undefined,
    image: record.thumbnail_url,
    gallery: record.gallery_urls ?? [],
    features: record.features ?? undefined,
    createdAt: record.created_at,
  }
}

const formatCurrency = (value: number, currency = "USD") =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const getProperties = cache(async (): Promise<Property[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("properties")
    .select("id,title,location,price,currency,bedrooms,bathrooms,area,category,description,thumbnail_url,gallery_urls,features,created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch properties", error)
    throw new Error("Unable to load properties.")
  }

  return (data ?? []).map(mapRecordToProperty)
})

export const getPropertyById = cache(async (id: string): Promise<Property | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("properties")
    .select("id,title,location,price,currency,bedrooms,bathrooms,area,category,description,thumbnail_url,gallery_urls,features,created_at")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null
    }
    console.error("Failed to fetch property", error)
    throw new Error("Unable to load property.")
  }

  return data ? mapRecordToProperty(data) : null
})

