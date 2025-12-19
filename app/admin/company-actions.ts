"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import {
  updateCompanyInfo,
  createService,
  updateService,
  deleteService,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "@/lib/data/company"
import type { CompanyInfoUpdate, ServiceUpdate, ContactInfoUpdate } from "@/lib/types/company"

// Validation schemas
const companyInfoSchema = z.object({
  name: z.string().min(1).optional(),
  tagline: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  calendly_link: z.string().url().optional().nullable(),
  founded: z.string().optional().nullable(),
  locations: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
  purpose: z.string().optional().nullable(),
  design_philosophy: z.string().optional().nullable(),
})

const serviceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  image: z.string().optional().nullable(),
  display_order: z.number().int().nonnegative().optional(),
  is_active: z.boolean().optional(),
})

const contactInfoSchema = z.object({
  type: z.string().min(1),
  label: z.string().optional().nullable(),
  value: z.string().min(1),
  display_order: z.number().int().nonnegative().optional(),
  is_primary: z.boolean().optional(),
  is_active: z.boolean().optional(),
})

// Company Info Actions
export async function updateCompanyInfoAction(formData: FormData) {
  try {
    const getValue = (key: string) => {
      const value = formData.get(key)?.toString()
      return value && value.trim() !== "" ? value : null
    }

    const data = {
      name: getValue("name") || undefined,
      tagline: getValue("tagline"),
      phone: getValue("phone"),
      email: getValue("email"),
      calendly_link: getValue("calendlyLink"),
      founded: getValue("founded"),
      locations: getValue("locations"),
      vision: getValue("vision"),
      mission: getValue("mission"),
      purpose: getValue("purpose"),
      design_philosophy: getValue("designPhilosophy"),
    }

    const parsed = companyInfoSchema.safeParse(data)

    if (!parsed.success) {
      return {
        error: parsed.error.errors.map((err) => err.message).join(", "),
      }
    }

    const updated = await updateCompanyInfo(parsed.data as CompanyInfoUpdate)

    revalidatePath("/")
    revalidatePath("/about")
    revalidatePath("/contacts")
    revalidatePath("/services")

    return { success: true, data: updated }
  } catch (error) {
    console.error("updateCompanyInfoAction error", error)
    return { error: "Failed to update company information. Please try again." }
  }
}

// Service Actions
export async function createServiceAction(formData: FormData) {
  try {
    const data = {
      slug: formData.get("slug")?.toString() || "",
      name: formData.get("name")?.toString() || "",
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      image: formData.get("image")?.toString() || null,
      display_order: formData.get("display_order") ? parseInt(formData.get("display_order")!.toString()) : 0,
      is_active: formData.get("is_active") === "true",
    }

    const parsed = serviceSchema.safeParse(data)

    if (!parsed.success) {
      return {
        error: parsed.error.errors.map((err) => err.message).join(", "),
      }
    }

    const service = await createService(parsed.data)

    revalidatePath("/services")
    revalidatePath(`/services/${service.slug}`)

    return { success: true, data: service }
  } catch (error) {
    console.error("createServiceAction error", error)
    return { error: "Failed to create service. Please try again." }
  }
}

export async function updateServiceAction(serviceId: string, formData: FormData) {
  try {
    const data: any = {}

    if (formData.get("slug")) data.slug = formData.get("slug")?.toString()
    if (formData.get("name")) data.name = formData.get("name")?.toString()
    if (formData.get("title")) data.title = formData.get("title")?.toString()
    if (formData.get("description")) data.description = formData.get("description")?.toString()
    if (formData.get("image")) data.image = formData.get("image")?.toString() || null
    if (formData.get("display_order"))
      data.display_order = parseInt(formData.get("display_order")!.toString())
    if (formData.get("is_active") !== null)
      data.is_active = formData.get("is_active") === "true"

    const parsed = serviceSchema.partial().safeParse(data)

    if (!parsed.success) {
      return {
        error: parsed.error.errors.map((err) => err.message).join(", "),
      }
    }

    const service = await updateService(serviceId, parsed.data as ServiceUpdate)

    revalidatePath("/services")
    revalidatePath(`/services/${service.slug}`)

    return { success: true, data: service }
  } catch (error) {
    console.error("updateServiceAction error", error)
    return { error: "Failed to update service. Please try again." }
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    await deleteService(serviceId)

    revalidatePath("/services")

    return { success: true }
  } catch (error) {
    console.error("deleteServiceAction error", error)
    return { error: "Failed to delete service. Please try again." }
  }
}

// Contact Info Actions
export async function createContactInfoAction(formData: FormData) {
  try {
    const data = {
      type: formData.get("type")?.toString() || "",
      label: formData.get("label")?.toString() || null,
      value: formData.get("value")?.toString() || "",
      display_order: formData.get("display_order") ? parseInt(formData.get("display_order")!.toString()) : 0,
      is_primary: formData.get("is_primary") === "true",
      is_active: formData.get("is_active") !== "false",
    }

    const parsed = contactInfoSchema.safeParse(data)

    if (!parsed.success) {
      return {
        error: parsed.error.errors.map((err) => err.message).join(", "),
      }
    }

    const contact = await createContactInfo(parsed.data)

    revalidatePath("/contacts")

    return { success: true, data: contact }
  } catch (error) {
    console.error("createContactInfoAction error", error)
    return { error: "Failed to create contact information. Please try again." }
  }
}

export async function updateContactInfoAction(contactId: string, formData: FormData) {
  try {
    const data: any = {}

    if (formData.get("type")) data.type = formData.get("type")?.toString()
    if (formData.get("label")) data.label = formData.get("label")?.toString() || null
    if (formData.get("value")) data.value = formData.get("value")?.toString()
    if (formData.get("display_order"))
      data.display_order = parseInt(formData.get("display_order")!.toString())
    if (formData.get("is_primary") !== null) data.is_primary = formData.get("is_primary") === "true"
    if (formData.get("is_active") !== null) data.is_active = formData.get("is_active") === "true"

    const parsed = contactInfoSchema.partial().safeParse(data)

    if (!parsed.success) {
      return {
        error: parsed.error.errors.map((err) => err.message).join(", "),
      }
    }

    const contact = await updateContactInfo(contactId, parsed.data as ContactInfoUpdate)

    revalidatePath("/contacts")

    return { success: true, data: contact }
  } catch (error) {
    console.error("updateContactInfoAction error", error)
    return { error: "Failed to update contact information. Please try again." }
  }
}

export async function deleteContactInfoAction(contactId: string) {
  try {
    await deleteContactInfo(contactId)

    revalidatePath("/contacts")

    return { success: true }
  } catch (error) {
    console.error("deleteContactInfoAction error", error)
    return { error: "Failed to delete contact information. Please try again." }
  }
}

