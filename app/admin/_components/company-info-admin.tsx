"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { updateCompanyInfoAction } from "@/app/admin/company-actions"
import type { CompanyInfo } from "@/lib/types/company"

interface CompanyInfoAdminProps {
  initialData: CompanyInfo | null
}

export function CompanyInfoAdmin({ initialData }: CompanyInfoAdminProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(initialData)
  const [isPending, startTransition] = useTransition()

  if (!companyInfo) {
    return <div className="text-center text-gray-500 py-8">No company information found.</div>
  }

  const handleChange = (field: string, value: string) => {
    setCompanyInfo((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleSave = () => {
    if (!companyInfo) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append("name", companyInfo.name || "")
      formData.append("tagline", companyInfo.tagline || "")
      formData.append("phone", companyInfo.phone || "")
      formData.append("email", companyInfo.email || "")
      formData.append("calendlyLink", companyInfo.calendly_link || "")
      formData.append("founded", companyInfo.founded || "")
      formData.append("locations", companyInfo.locations || "")
      formData.append("vision", companyInfo.vision || "")
      formData.append("mission", companyInfo.mission || "")
      formData.append("purpose", companyInfo.purpose || "")
      formData.append("designPhilosophy", companyInfo.design_philosophy || "")

      const result = await updateCompanyInfoAction(formData)

      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Company information updated successfully")
      
      // Update local state with the returned data
      if (result?.data) {
        setCompanyInfo(result.data)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Company Information</h2>
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={companyInfo.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={companyInfo.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="calendlyLink">Calendly Link</Label>
            <Input
              id="calendlyLink"
              value={companyInfo.calendly_link || ""}
              onChange={(e) => handleChange("calendly_link", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={companyInfo.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={companyInfo.tagline || ""}
              onChange={(e) => handleChange("tagline", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locations">Locations</Label>
            <Input
              id="locations"
              value={companyInfo.locations || ""}
              onChange={(e) => handleChange("locations", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founded">Founded</Label>
            <Input
              id="founded"
              value={companyInfo.founded || ""}
              onChange={(e) => handleChange("founded", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              value={companyInfo.purpose || ""}
              onChange={(e) => handleChange("purpose", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission">Mission</Label>
            <Textarea
              id="mission"
              value={companyInfo.mission || ""}
              onChange={(e) => handleChange("mission", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={companyInfo.vision || ""}
              onChange={(e) => handleChange("vision", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designPhilosophy">Design Philosophy</Label>
            <Textarea
              id="designPhilosophy"
              value={companyInfo.design_philosophy || ""}
              onChange={(e) => handleChange("design_philosophy", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

