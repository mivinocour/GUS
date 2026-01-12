-- Add slug field to restaurants table for URL-friendly identifiers

-- Add slug column
ALTER TABLE restaurants
ADD COLUMN slug VARCHAR(50);

-- Make it unique and not null after we populate it
-- First, let's add the constraint without the NOT NULL to allow population
ALTER TABLE restaurants
ADD CONSTRAINT restaurants_slug_unique UNIQUE (slug);

-- Add index for performance
CREATE INDEX idx_restaurants_slug ON restaurants(slug);

-- Update existing restaurants with default slugs (if any exist)
-- This is safe since we're just starting and likely have no existing data
UPDATE restaurants SET slug = 'gus' WHERE name LIKE '%Patio%';
UPDATE restaurants SET slug = 'sikwa' WHERE name LIKE '%Sikwa%';
UPDATE restaurants SET slug = 'filippo' WHERE name LIKE '%Filippo%';

-- Now make the column NOT NULL (this will fail if there are restaurants without slugs)
-- ALTER TABLE restaurants ALTER COLUMN slug SET NOT NULL;
-- Note: Uncomment the line above after seeding data or if you're sure all restaurants have slugs