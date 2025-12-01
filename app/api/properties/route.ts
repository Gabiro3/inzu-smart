import { NextResponse } from "next/server"
import { getProperties } from "@/lib/data/properties"

export async function GET() {
  try {
    const properties = await getProperties()
    return NextResponse.json({ data: properties })
  } catch (error) {
    console.error("[api/properties] GET failed", error)
    return NextResponse.json({ error: "Failed to load properties" }, { status: 500 })
  }
}

