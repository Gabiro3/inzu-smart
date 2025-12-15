"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { COMPANY_INFO } from "@/lib/constants"
import { Save } from "lucide-react"
import { toast } from "sonner"

export function CompanyInfoAdmin() {
  const [companyInfo, setCompanyInfo] = useState(COMPANY_INFO)
  const [isPending, startTransition] = useTransition()

  const handleChange = (field: string, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    startTransition(async () => {
      // TODO: Implement API call to save company info
      // For now, just show a success message
      toast.success("Company information updated successfully")
      // In a real implementation, you would:
      // 1. Call an API endpoint to update the company info
      // 2. Update the database
      // 3. Revalidate the cache
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
                value={companyInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="calendlyLink">Calendly Link</Label>
            <Input
              id="calendlyLink"
              value={companyInfo.calendlyLink}
              onChange={(e) => handleChange("calendlyLink", e.target.value)}
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
              value={companyInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={companyInfo.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locations">Locations</Label>
            <Input
              id="locations"
              value={companyInfo.locations}
              onChange={(e) => handleChange("locations", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="founded">Founded</Label>
            <Input
              id="founded"
              value={companyInfo.founded}
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
              value={companyInfo.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission">Mission</Label>
            <Textarea
              id="mission"
              value={companyInfo.mission}
              onChange={(e) => handleChange("mission", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={companyInfo.vision}
              onChange={(e) => handleChange("vision", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designPhilosophy">Design Philosophy</Label>
            <Textarea
              id="designPhilosophy"
              value={companyInfo.designPhilosophy}
              onChange={(e) => handleChange("designPhilosophy", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

