import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getProperties } from "@/lib/data/properties"
import { AdminDashboard } from "./_components/admin-dashboard"

export default async function AdminPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const properties = await getProperties()

  return (
    <main className="min-h-screen">
      <div className="pt-16 pb-16 px-4">
        <AdminDashboard initialProperties={properties} adminEmail={session.user.email ?? "admin"} />
      </div>
    </main>
  )
}

