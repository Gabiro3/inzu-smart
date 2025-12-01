"use client"

import { useRef, useState } from "react"
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
  const [selectedCategory, setSelectedCategory] = useState(property.category || CATEGORIES[0]?.id || "")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set("category", selectedCategory)
    onUpdate(property.id, formData)
  }

  return (
    <div className="space-y-6">
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
            <Label htmlFor="edit-price">Price (USD)</Label>
            <Input
              id="edit-price"
              name="price"
              type="number"
              min={0}
              step="1000"
              defaultValue={property.price}
              required
            />
          </div>
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
          <Label htmlFor="edit-images">Property Images (Optional - leave empty to keep existing)</Label>
          <Input id="edit-images" name="images" type="file" multiple accept="image/*" />
          <p className="text-sm text-gray-500">
            Upload new images to replace existing ones. Leave empty to keep current images.
          </p>
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

