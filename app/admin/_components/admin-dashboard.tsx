"use client"

import { useRef, useState, useTransition } from "react"
import Image from "next/image"
import { PlusCircle, Trash2, Eye, Edit, Home, List, Building2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPropertyAction, deletePropertyAction, updatePropertyAction } from "../actions"
import { CATEGORIES } from "@/lib/constants"
import type { Property } from "@/lib/types/property"
import { toast } from "sonner"
import { PropertyDetailView } from "./property-detail-view"
import { PropertyEditForm } from "./property-edit-form"
import { ImageModal } from "./image-modal"
import { LogoutButton } from "./logout-button"
import { ServicesAdmin } from "./services-admin"
import { CompanyInfoAdmin } from "./company-info-admin"

function CategorySelect({ name, required }: { name: string; required?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]?.id || "")

  return (
    <>
      <Select value={selectedCategory} onValueChange={setSelectedCategory} required={required}>
        <SelectTrigger className="w-full">
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
      <input type="hidden" name={name} value={selectedCategory} />
    </>
  )
}

type AdminDashboardProps = {
  initialProperties: Property[]
  adminEmail: string
}

type ViewMode = "properties" | "add" | "services" | "company"

export function AdminDashboard({ initialProperties, adminEmail }: AdminDashboardProps) {
  const [properties, setProperties] = useState(initialProperties)
  const [isPending, startTransition] = useTransition()
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("properties")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createPropertyAction(formData)
      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Property created successfully")
      setProperties(result?.data ?? [])
      formRef.current?.reset()
      setViewMode("properties")
    })
  }

  const handleDelete = (propertyId: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    setDeletePendingId(propertyId)
    startTransition(async () => {
      const result = await deletePropertyAction(propertyId)
      if (result?.error) {
        toast.error(result.error)
        setDeletePendingId(null)
        return
      }
      toast.success("Property deleted")
      setProperties(result?.data ?? [])
      setDeletePendingId(null)
      if (selectedProperty?.id === propertyId) {
        setIsDetailOpen(false)
        setIsEditOpen(false)
        setSelectedProperty(null)
      }
    })
  }

  const handleView = (property: Property) => {
    setSelectedProperty(property)
    setIsDetailOpen(true)
  }

  const handleEdit = (property: Property) => {
    setSelectedProperty(property)
    setIsEditOpen(true)
    setIsDetailOpen(false)
  }

  const handleUpdate = (propertyId: string, formData: FormData) => {
    startTransition(async () => {
      const result = await updatePropertyAction(propertyId, formData)
      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Property updated successfully")
      setProperties(result?.data ?? [])
      setIsEditOpen(false)
      setSelectedProperty(null)
    })
  }

  return (
    <>
      <div className="max-w-6xl mx-auto py-8 space-y-8 pb-24">
        <header className="space-y-2 text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-500">Signed in as {adminEmail}</p>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your listings, upload new properties, and keep your catalog up to date.</p>
            </div>
            <div className="flex-1 flex justify-end">
              <LogoutButton />
            </div>
          </div>
        </header>

        {viewMode === "add" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                Add New Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                ref={formRef}
                className="grid gap-6"
                onSubmit={(event) => {
                  event.preventDefault()
                  const form = event.currentTarget
                  const formData = new FormData(form)
                  handleSubmit(formData)
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Modern Luxe Villa" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="20 S Aurora Ave, Miami" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" name="price" type="number" min={0} step="1000" placeholder="1650000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" min={0} placeholder="4" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" min={1} placeholder="3" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" name="area" placeholder="200m²" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <CategorySelect name="category" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the property, highlights, smart home capabilities, etc."
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Property Images</Label>
                  <Input id="images" name="images" type="file" multiple accept="image/*" required />
                  <p className="text-sm text-gray-500">Upload at least one image. The first image becomes the thumbnail.</p>
                </div>

                <Button type="submit" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Property"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {viewMode === "properties" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Properties ({properties.length})</h2>
            </div>

            <div className="grid gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6 grid md:grid-cols-[200px_1fr_auto] gap-6 items-center">
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                      <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" sizes="200px" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{property.title}</h3>
                      <p className="text-gray-600">{property.location}</p>
                      <p className="mt-2 font-medium">{property.priceLabel}</p>
                      <p className="text-sm text-gray-500">
                        {property.bedrooms} bd • {property.bathrooms} ba • {property.area}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-self-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(property)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(property)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                        disabled={deletePendingId === property.id}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deletePendingId === property.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {properties.length === 0 && <p className="text-center text-gray-500 py-12">No properties yet.</p>}
            </div>
          </section>
        )}
      </div>

        {viewMode === "services" && <ServicesAdmin />}

        {viewMode === "company" && <CompanyInfoAdmin />}
      </div>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-around h-16 overflow-x-auto">
            <Button
              variant={viewMode === "properties" ? "default" : "ghost"}
              onClick={() => setViewMode("properties")}
              className={`flex flex-col items-center gap-1 h-full rounded-none min-w-[80px] ${
                viewMode === "properties" ? "bg-emerald-50 text-emerald-600" : ""
              }`}
            >
              <List className="w-5 h-5" />
              <span className="text-xs">Properties</span>
            </Button>
            <Button
              variant={viewMode === "add" ? "default" : "ghost"}
              onClick={() => setViewMode("add")}
              className={`flex flex-col items-center gap-1 h-full rounded-none min-w-[80px] ${
                viewMode === "add" ? "bg-emerald-50 text-emerald-600" : ""
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="text-xs">Add</span>
            </Button>
            <Button
              variant={viewMode === "services" ? "default" : "ghost"}
              onClick={() => setViewMode("services")}
              className={`flex flex-col items-center gap-1 h-full rounded-none min-w-[80px] ${
                viewMode === "services" ? "bg-emerald-50 text-emerald-600" : ""
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs">Services</span>
            </Button>
            <Button
              variant={viewMode === "company" ? "default" : "ghost"}
              onClick={() => setViewMode("company")}
              className={`flex flex-col items-center gap-1 h-full rounded-none min-w-[80px] ${
                viewMode === "company" ? "bg-emerald-50 text-emerald-600" : ""
              }`}
            >
              <Info className="w-5 h-5" />
              <span className="text-xs">Company</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Property Detail Dialog */}
      {selectedProperty && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto">
            <PropertyDetailView
              property={selectedProperty}
              onEdit={() => {
                setIsDetailOpen(false)
                setIsEditOpen(true)
              }}
              onDelete={() => handleDelete(selectedProperty.id)}
              onImageClick={(index) => setSelectedImageIndex(index)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Image Modal - Rendered outside nested Dialog */}
      {selectedProperty && (
        <ImageModal
          images={
            selectedProperty.gallery && selectedProperty.gallery.length > 0
              ? selectedProperty.gallery
              : [selectedProperty.image]
          }
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onPrevious={() => {
            if (selectedImageIndex !== null) {
              const allImages =
                selectedProperty.gallery && selectedProperty.gallery.length > 0
                  ? selectedProperty.gallery
                  : [selectedProperty.image]
              setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length)
            }
          }}
          onNext={() => {
            if (selectedImageIndex !== null) {
              const allImages =
                selectedProperty.gallery && selectedProperty.gallery.length > 0
                  ? selectedProperty.gallery
                  : [selectedProperty.image]
              setSelectedImageIndex((selectedImageIndex + 1) % allImages.length)
            }
          }}
          propertyTitle={selectedProperty.title}
        />
      )}

      {/* Property Edit Dialog */}
      {selectedProperty && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <PropertyEditForm
              property={selectedProperty}
              onUpdate={handleUpdate}
              onCancel={() => {
                setIsEditOpen(false)
                setSelectedProperty(null)
              }}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
