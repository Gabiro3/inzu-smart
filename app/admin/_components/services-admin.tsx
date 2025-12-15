"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SERVICES } from "@/lib/constants"
import { Edit, Save, X } from "lucide-react"
import { toast } from "sonner"

export function ServicesAdmin() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedServices, setEditedServices] = useState(SERVICES)
  const [isPending, startTransition] = useTransition()

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedServices(SERVICES)
  }

  const handleSave = (id: string) => {
    startTransition(async () => {
      // TODO: Implement API call to save service
      // For now, just show a success message
      toast.success("Service updated successfully")
      setEditingId(null)
      // In a real implementation, you would:
      // 1. Call an API endpoint to update the service
      // 2. Update the database
      // 3. Revalidate the cache
    })
  }

  const handleChange = (id: string, field: string, value: string) => {
    setEditedServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, [field]: value } : service))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Services ({SERVICES.length})</h2>
        <p className="text-sm text-gray-500">Manage your company services</p>
      </div>

      <div className="grid gap-6">
        {editedServices.map((service) => {
          const isEditing = editingId === service.id
          return (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{service.name}</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service.id)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave(service.id)}
                        disabled={isPending}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor={`title-${service.id}`}>Title</Label>
                      <Input
                        id={`title-${service.id}`}
                        value={editedServices.find((s) => s.id === service.id)?.title || ""}
                        onChange={(e) => handleChange(service.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${service.id}`}>Description</Label>
                      <Textarea
                        id={`description-${service.id}`}
                        value={editedServices.find((s) => s.id === service.id)?.description || ""}
                        onChange={(e) => handleChange(service.id, "description", e.target.value)}
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`image-${service.id}`}>Image URL</Label>
                      <Input
                        id={`image-${service.id}`}
                        value={editedServices.find((s) => s.id === service.id)?.image || ""}
                        onChange={(e) => handleChange(service.id, "image", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">{service.description}</p>
                    <p className="text-sm text-gray-500">Image: {service.image}</p>
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

