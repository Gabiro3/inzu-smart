-- Company Information Schema
-- This schema handles company information and services for INZU SMART

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Company Information Table
CREATE TABLE IF NOT EXISTS company_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    calendly_link TEXT,
    founded VARCHAR(10),
    locations TEXT,
    vision TEXT,
    mission TEXT,
    purpose TEXT,
    design_philosophy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure only one row exists
    CONSTRAINT single_company CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

-- Insert default company info (using fixed UUID to ensure single row)
INSERT INTO company_info (
    id,
    name,
    tagline,
    phone,
    email,
    calendly_link,
    founded,
    locations,
    vision,
    mission,
    purpose,
    design_philosophy
) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'INZU SMART',
    'Building smarter, living better.',
    '+212781278990',
    'inzu.smart@inzu.ma',
    'https://calendar.app.google/SLtyEqciEQJu4MZH8',
    '2024',
    'Morocco, and Kigali, Rwanda',
    'To become one of Africa''s leading provider of intelligent, accessible, and culturally grounded housing solutions.',
    'To combine architectural expertise with smart technology to help individuals and communities design and build safer, better, and more affordable homes.',
    'INZU SMART exists to make the process of designing, planning, and building homes easier and more accessible. By combining professional expertise with digital technology, the company helps clients make smarter decisions and achieve better building outcomes.',
    'Our design philosophy is rooted in simplicity, functionality, sustainability, and cultural relevance. We create spaces that respond to local climate, local materials, and community needs while integrating modern aesthetics and smart building strategies.'
) ON CONFLICT (id) DO NOTHING;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, display_order);

-- Insert default services
INSERT INTO services (slug, name, title, description, image, display_order) VALUES
(
    'architecture',
    'ARCHITECTURE',
    'Architecture',
    'We help our clients who are unsure what to build or invest in architecturally by providing essential clarity and direction. Our role is to act as a strategic advisor, defining the highest and best use for their property or site. This involves conducting feasibility studies, defining the functional program, and mitigating potential risks before they commit to expensive design or construction phases. Ultimately, we ensure their architectural investment is well-defined, aligned with their goals, and set up for maximum success from day one.',
    '/images/contrast_villa.jpg',
    1
),
(
    'engineering',
    'ENGINEERING',
    'Engineering',
    'We provide comprehensive engineering services that ensure your project is structurally sound, efficient, and compliant with all regulations. Our engineering team works closely with architects and contractors to deliver integrated solutions that optimize performance, sustainability, and cost-effectiveness throughout the entire construction process.',
    '/images/golden_hour.jpg',
    2
),
(
    'consultancy',
    'CONSULTANCY',
    'Consultancy',
    'We help our clients who are unsure what to build or invest in architecturally by providing essential clarity and direction. Our role is to act as a strategic advisor, defining the highest and best use for their property or site. This involves conducting feasibility studies, defining the functional program, and mitigating potential risks before they commit to expensive design or construction phases. Ultimately, we ensure their architectural investment is well-defined, aligned with their goals, and set up for maximum success from day one.',
    '/images/sandstone_1.jpg',
    3
),
(
    'project-management',
    'PROJECT MANAGEMENT',
    'Project Management',
    'We oversee your entire construction project from conception to completion, ensuring timely delivery, budget adherence, and quality standards. Our project management team coordinates all stakeholders, manages schedules, tracks progress, and resolves issues proactively to keep your project on track and within budget.',
    '/images/veranda_1.jpg',
    4
),
(
    'material-supply',
    'MATERIAL SUPPLY',
    'Material Supply',
    'We also simplify and lower the costs of your entire construction process by managing the procurement and supply of construction materials directly. We bypass traditional, multi-layered suppliers and work straight with the producers and manufacturers. This strategy ensures you receive high-quality materials at the lowest possible prices because we eliminate the middlemen markups. This not only significantly reduces your project budget but also streamlines the timeline, guaranteeing materials are delivered when and where they are needed, making the construction process faster and easier.',
    '/images/el_monolito_01.jpg',
    5
)
ON CONFLICT (slug) DO NOTHING;

-- Contact Information Table (for multiple phone numbers or contact methods)
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'phone', 'email', 'address', 'social', etc.
    label VARCHAR(255), -- e.g., 'Main Phone', 'Secondary Phone', 'Office Email'
    value TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact info
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON contact_info(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_active ON contact_info(is_active, display_order);

-- Insert default contact information
INSERT INTO contact_info (type, label, value, display_order, is_primary) VALUES
('phone', 'Main Phone', '+212781278990', 1, TRUE),
('phone', 'Secondary Phone', '+212781278990', 2, FALSE),
('email', 'Main Email', 'inzu.smart@inzu.ma', 1, TRUE)
ON CONFLICT DO NOTHING;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_company_info_updated_at
    BEFORE UPDATE ON company_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON contact_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to company info
CREATE POLICY "Public can read company info"
    ON company_info FOR SELECT
    USING (true);

-- Policy: Allow authenticated users (admins) to update company info
CREATE POLICY "Admins can update company info"
    ON company_info FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Policy: Allow public read access to active services
CREATE POLICY "Public can read active services"
    ON services FOR SELECT
    USING (is_active = true);

-- Policy: Allow authenticated users (admins) to manage services
CREATE POLICY "Admins can manage services"
    ON services FOR ALL
    USING (auth.role() = 'authenticated');

-- Policy: Allow public read access to active contact info
CREATE POLICY "Public can read active contact info"
    ON contact_info FOR SELECT
    USING (is_active = true);

-- Policy: Allow authenticated users (admins) to manage contact info
CREATE POLICY "Admins can manage contact info"
    ON contact_info FOR ALL
    USING (auth.role() = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE company_info IS 'Stores company information and details';
COMMENT ON TABLE services IS 'Stores service offerings and descriptions';
COMMENT ON TABLE contact_info IS 'Stores contact information (phone, email, addresses, etc.)';

COMMENT ON COLUMN company_info.id IS 'Fixed UUID to ensure only one company info record exists';
COMMENT ON COLUMN services.slug IS 'URL-friendly identifier for the service';
COMMENT ON COLUMN services.display_order IS 'Order in which services should be displayed';
COMMENT ON COLUMN contact_info.type IS 'Type of contact information (phone, email, address, social, etc.)';

