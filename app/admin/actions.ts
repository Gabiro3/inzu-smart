"use server"

import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { getProperties } from "@/lib/data/properties"

const propertySchema = z.object({
  title: z.string().min(3),
  location: z.string().min(3),
  price: z.coerce.number().positive(),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  area: z.string().min(2),
  category: z.string().optional(),
  description: z.string().min(10),
})

const bucketName = "properties"

async function uploadImages(files: File[], supabase = createSupabaseAdminClient()) {
  const urls: string[] = []

  for (const file of files) {
    const extension = file.name.split(".").pop() || "jpg"
    const path = `${randomUUID()}.${extension}`

    const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type || "image/jpeg",
      upsert: false,
    })

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(path)

    urls.push(publicUrl)
  }

  return urls
}

export async function createPropertyAction(formData: FormData) {
  const supabase = createSupabaseAdminClient()

  const parsed = propertySchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location"),
    price: formData.get("price"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    area: formData.get("area"),
    category: formData.get("category"),
    description: formData.get("description"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.errors.map((err) => err.message).join(", "),
    }
  }

  const images = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0)

  if (images.length === 0) {
    return { error: "Please upload at least one property image." }
  }

  try {
    const imageUrls = await uploadImages(images, supabase)

    const { error } = await supabase.from("properties").insert({
      title: parsed.data.title,
      location: parsed.data.location,
      price: parsed.data.price,
      bedrooms: parsed.data.bedrooms,
      bathrooms: parsed.data.bathrooms,
      area: parsed.data.area,
      category: parsed.data.category,
      description: parsed.data.description,
      thumbnail_url: imageUrls[0],
      gallery_urls: imageUrls,
    })

    if (error) {
      throw error
    }

    revalidatePath("/")
    revalidatePath("/projects")

    const updatedProperties = await getProperties()

    return { success: true, data: updatedProperties }
  } catch (error) {
    console.error("createPropertyAction error", error)
    return { error: "Failed to create property. Please try again." }
  }
}

export async function updatePropertyAction(propertyId: string, formData: FormData) {
  const supabase = createSupabaseAdminClient()

  const parsed = propertySchema.safeParse({
    title: formData.get("title"),
    location: formData.get("location"),
    price: formData.get("price"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    area: formData.get("area"),
    category: formData.get("category"),
    description: formData.get("description"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.errors.map((err) => err.message).join(", "),
    }
  }

  try {
    const updateData: any = {
      title: parsed.data.title,
      location: parsed.data.location,
      price: parsed.data.price,
      bedrooms: parsed.data.bedrooms,
      bathrooms: parsed.data.bathrooms,
      area: parsed.data.area,
      category: parsed.data.category || null,
      description: parsed.data.description,
    }

    const images = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0)

    if (images.length > 0) {
      const imageUrls = await uploadImages(images, supabase)
      
      // Get existing property to delete old images
      const { data: existing } = await supabase
        .from("properties")
        .select("gallery_urls")
        .eq("id", propertyId)
        .single()

      if (existing?.gallery_urls?.length) {
        for (const url of existing.gallery_urls) {
          const path = url.split(`${bucketName}/`)[1]
          if (!path) continue
          await supabase.storage.from(bucketName).remove([path])
        }
      }

      updateData.thumbnail_url = imageUrls[0]
      updateData.gallery_urls = imageUrls
    }

    const { error } = await supabase.from("properties").update(updateData).eq("id", propertyId)

    if (error) {
      throw error
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath(`/property/${propertyId}`)

    const updatedProperties = await getProperties()

    return { success: true, data: updatedProperties }
  } catch (error) {
    console.error("updatePropertyAction error", error)
    return { error: "Failed to update property. Please try again." }
  }
}

export async function deletePropertyAction(propertyId: string) {
  const supabase = createSupabaseAdminClient()

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("properties")
      .select("gallery_urls")
      .eq("id", propertyId)
      .single()

    if (fetchError) {
      throw fetchError
    }

    if (existing?.gallery_urls?.length) {
      for (const url of existing.gallery_urls) {
        const path = url.split(`${bucketName}/`)[1]
        if (!path) continue
        await supabase.storage.from(bucketName).remove([path])
      }
    }

    const { error } = await supabase.from("properties").delete().eq("id", propertyId)
    if (error) {
      throw error
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath(`/property/${propertyId}`)

    const updatedProperties = await getProperties()

    return { success: true, data: updatedProperties }
  } catch (error) {
    console.error("deletePropertyAction error", error)
    return { error: "Failed to delete property." }
  }
}

