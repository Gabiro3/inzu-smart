import { NextResponse } from "next/server"
import { getPropertyById } from "@/lib/data/properties"

interface Params {
  params: {
    id: string
  }
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const property = await getPropertyById(params.id)
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ data: property })
  } catch (error) {
    console.error(`[api/properties/${params.id}] GET failed`, error)
    return NextResponse.json({ error: "Failed to load property" }, { status: 500 })
  }
}

