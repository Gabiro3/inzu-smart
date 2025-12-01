"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"
import { toast } from "sonner"

export function LogoutButton() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Logged out successfully")
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Unable to log out. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  )
}

