# Company Information Database Schema

This directory contains the SQL schema for managing company information, services, and contact details.

## Setup Instructions

### 1. Run the Schema in Supabase

You can run the schema in one of two ways:

#### Option A: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Click "Run" to execute the schema

#### Option B: Using Supabase CLI
```bash
supabase db reset
# or
psql -h your-db-host -U postgres -d postgres -f schema.sql
```

### 2. Verify Tables

After running the schema, verify that the tables were created:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('company_info', 'services', 'contact_info');

-- Check company info
SELECT * FROM company_info;

-- Check services
SELECT * FROM services ORDER BY display_order;

-- Check contact info
SELECT * FROM contact_info ORDER BY display_order;
```

## Schema Overview

### Tables

#### `company_info`
Stores company-wide information (name, tagline, contact info, mission, vision, etc.)
- **Single Row Constraint**: Only one row is allowed (enforced by CHECK constraint)
- **Fixed UUID**: Uses a fixed UUID to ensure uniqueness

#### `services`
Stores service offerings with descriptions, images, and display order
- **Slug**: URL-friendly identifier (e.g., 'architecture', 'engineering')
- **Display Order**: Controls the order services appear on the website
- **Active Flag**: Allows soft-deleting services without removing them

#### `contact_info`
Stores contact information (phone numbers, emails, addresses, etc.)
- **Type**: Categorizes contact info (phone, email, address, social, etc.)
- **Primary Flag**: Marks the primary contact method
- **Display Order**: Controls the order contacts appear

## Usage Examples

### Update Company Information

```typescript
import { updateCompanyInfo } from "@/lib/data/company"

await updateCompanyInfo({
  phone: "+212781278990",
  email: "inzu.smart@inzu.ma",
  vision: "Updated vision statement..."
})
```

### Get All Services

```typescript
import { getServices } from "@/lib/data/company"

const services = await getServices()
// Returns array of active services ordered by display_order
```

### Get Service by Slug

```typescript
import { getServiceBySlug } from "@/lib/data/company"

const service = await getServiceBySlug("architecture")
```

### Update a Service

```typescript
import { updateService } from "@/lib/data/company"

await updateService(serviceId, {
  description: "Updated description...",
  image: "/images/new-image.jpg"
})
```

### Get Contact Information

```typescript
import { getContactInfo } from "@/lib/data/company"

const contacts = await getContactInfo()
// Returns array of active contacts ordered by display_order
```

## Row Level Security (RLS)

The schema includes RLS policies:

- **Public Read Access**: Anyone can read company info, active services, and active contact info
- **Admin Write Access**: Only authenticated users can create, update, or delete records

Make sure your Supabase authentication is properly configured for admin access.

## Automatic Timestamps

All tables have automatic `updated_at` timestamps via triggers. The `created_at` timestamp is set on insert.

## Notes

- The `company_info` table uses a fixed UUID to ensure only one record exists
- Services can be soft-deleted by setting `is_active = false`
- Contact info can be soft-deleted by setting `is_active = false`
- All tables use UUIDs as primary keys for better scalability

