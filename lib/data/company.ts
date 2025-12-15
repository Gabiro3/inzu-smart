import "server-only"

import { cache } from "react"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import type { CompanyInfo, Service, ContactInfo } from "@/lib/types/company"

const COMPANY_INFO_ID = "00000000-0000-0000-0000-000000000001"

export const getCompanyInfo = cache(async (): Promise<CompanyInfo | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .eq("id", COMPANY_INFO_ID)
    .single()

  if (error) {
    console.error("Failed to fetch company info", error)
    return null
  }

  return data
})

export const updateCompanyInfo = async (updates: Partial<CompanyInfo>): Promise<CompanyInfo | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("company_info")
    .update(updates)
    .eq("id", COMPANY_INFO_ID)
    .select()
    .single()

  if (error) {
    console.error("Failed to update company info", error)
    throw new Error("Failed to update company info")
  }

  return data
}

export const getServices = cache(async (): Promise<Service[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Failed to fetch services", error)
    return []
  }

  return data ?? []
})

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("Failed to fetch service", error)
    return null
  }

  return data
})

export const createService = async (service: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("services")
    .insert(service)
    .select()
    .single()

  if (error) {
    console.error("Failed to create service", error)
    throw new Error("Failed to create service")
  }

  return data
}

export const updateService = async (id: string, updates: Partial<Service>): Promise<Service> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("services")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Failed to update service", error)
    throw new Error("Failed to update service")
  }

  return data
}

export const deleteService = async (id: string): Promise<void> => {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    console.error("Failed to delete service", error)
    throw new Error("Failed to delete service")
  }
}

export const getContactInfo = cache(async (): Promise<ContactInfo[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Failed to fetch contact info", error)
    return []
  }

  return data ?? []
})

export const createContactInfo = async (
  contact: Omit<ContactInfo, "id" | "created_at" | "updated_at">
): Promise<ContactInfo> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("contact_info")
    .insert(contact)
    .select()
    .single()

  if (error) {
    console.error("Failed to create contact info", error)
    throw new Error("Failed to create contact info")
  }

  return data
}

export const updateContactInfo = async (id: string, updates: Partial<ContactInfo>): Promise<ContactInfo> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from("contact_info")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Failed to update contact info", error)
    throw new Error("Failed to update contact info")
  }

  return data
}

export const deleteContactInfo = async (id: string): Promise<void> => {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from("contact_info").delete().eq("id", id)

  if (error) {
    console.error("Failed to delete contact info", error)
    throw new Error("Failed to delete contact info")
  }
}

