"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIES } from "@/lib/constants"
import type { Property } from "@/lib/types/property"

type PropertyEditFormProps = {
  property: Property
  onUpdate: (propertyId: string, formData: FormData) => void
  onCancel: () => void
  isPending: boolean
}

export function PropertyEditForm({ property, onUpdate, onCancel, isPending }: PropertyEditFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedCategory, setSelectedCategory] = useState(property.category || CATEGORIES[0]?.id || "")
  const [existingImages, setExistingImages] = useState<string[]>(
    property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]
  )
  const [newImages, setNewImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setNewImages((prev) => [...prev, ...files])
    
    // Create previews for new images
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...newPreviews])
  }

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  const removeNewImage = (index: number) => {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imagePreviews[index])
    
    setNewImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    
    // Reset file input if all new images are removed
    if (fileInputRef.current && newImages.length === 1) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set("category", selectedCategory)
    
    // Add images to remove (existing images that were removed)
    const allOriginalImages = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]
    const removedImages = allOriginalImages.filter((img) => !existingImages.includes(img))
    formData.set("removedImages", JSON.stringify(removedImages))
    
    // Add new images
    newImages.forEach((file) => {
      formData.append("images", file)
    })
    
    onUpdate(property.id, formData)
  }

  return (
    <div className="space-y-6 max-w-[95vw] mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-2">Edit Property</h2>
        <p className="text-gray-600">Update the property details below.</p>
      </div>

      <form ref={formRef} className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input id="edit-title" name="title" defaultValue={property.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-location">Location</Label>
            <Input id="edit-location" name="location" defaultValue={property.location} required />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="edit-bedrooms">Bedrooms</Label>
            <Input
              id="edit-bedrooms"
              name="bedrooms"
              type="number"
              min={0}
              defaultValue={property.bedrooms}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-bathrooms">Bathrooms</Label>
            <Input
              id="edit-bathrooms"
              name="bathrooms"
              type="number"
              min={1}
              defaultValue={property.bathrooms}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-area">Area</Label>
            <Input id="edit-area" name="area" defaultValue={property.area} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
            <SelectTrigger className="w-full" id="edit-category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="category" value={selectedCategory} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-description">Description</Label>
          <Textarea
            id="edit-description"
            name="description"
            defaultValue={property.description || ""}
            required
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-images">Property Images</Label>
          <Input
            ref={fileInputRef}
            id="edit-images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500">
            Upload new images to add to the gallery. You can remove existing images below.
          </p>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">Existing Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {existingImages.map((imageUrl, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={imageUrl}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Uploaded Images */}
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">New Uploaded Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={preview}
                        alt={`New image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isPending}>
            {isPending ? "Updating..." : "Update Property"}
          </Button>
        </div>
      </form>
    </div>
  )
}

