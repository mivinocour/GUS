# Guide: Adding a New Restaurant

This guide walks you through adding a new restaurant (e.g., Olive Garden) to the system.

## Prerequisites

1. ✅ Menu file created in `frontend/restaurants/olivegarden.ts`
2. ✅ Restaurant added to `frontend/restaurants/index.ts` (already done)
3. Access to Supabase dashboard

## Step-by-Step Process

### Step 1: Add Restaurant to Supabase Database

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to **Table Editor** → **restaurants** table

2. **Insert New Restaurant Row**
   - Click **"Insert"** → **"Insert row"**
   - Fill in the following fields:

   | Field | Value | Notes |
   |-------|-------|-------|
   | `id` | *(auto-generated UUID)* | Leave empty - Supabase will generate this |
   | `name` | `Olive Garden` | Full restaurant name |
   | `slug` | `olivegarden` | **Must match the key in restaurants/index.ts** (lowercase, no spaces) |
   | `address` | `[Your address]` | Optional |
   | `phone` | `[Phone number]` | Optional |
   | `email` | `[Email]` | Optional |
   | `logo` | `null` or URL | Optional - can be null |
   | `colors` | `{"primary": "#2563EB", "primary-dark": "#1d4ed8", "background": "#F8FAFC"}` | JSON object matching your restaurant file |
   | `created_at` | *(auto-generated)* | Leave empty |
   | `updated_at` | *(auto-generated)* | Leave empty |

3. **Important Notes:**
   - The `slug` field **must be unique** and match exactly: `olivegarden`
   - The `slug` is what you'll use in the URL: `?res=olivegarden`
   - Copy the generated `id` (UUID) - you'll need it for Step 2

4. **Click "Save"** to insert the row

### Step 2: Update Frontend UUID Mapping

After creating the restaurant in Supabase, you'll get a UUID. Update the mapping:

1. **Open** `frontend/services/menuMapping.ts`

2. **Add to `RESTAURANT_ID_MAPPING`:**
   ```typescript
   export const RESTAURANT_ID_MAPPING: Record<string, string> = {
     'gus': '1d446dfa-e91a-4df5-b1d8-7dae543a2292',
     'sikwa': '362d4559-0c60-44ea-a799-647b5f5b9a8a',
     'filippo': '64efa06f-429d-4d91-9185-6f85fc42dfa2',
     'olivegarden': 'YOUR-UUID-HERE',  // ← Add this line with the UUID from Supabase
   };
   ```

3. **Replace `YOUR-UUID-HERE`** with the actual UUID from Step 1

### Step 3: Populate Menu Items in Database

The menu items need to be added to the database. You have two options:

#### Option A: Use the Backend Script (Recommended)

1. **Create a populate script** similar to `backend/populate_menu.py` or `backend/populate_sikwa.py`
2. **Run the script** to populate categories and menu items
3. The script should:
   - Create `menu_categories` entries
   - Create `menu_items` entries with proper `restaurant_id`
   - Mark recommended items with `is_recommended = true`

#### Option B: Manual Entry in Supabase (Not Recommended)

1. For each category in your menu:
   - Go to **Table Editor** → **menu_categories**
   - Insert row with:
     - `restaurant_id`: (UUID from Step 1)
     - `name`: Category name
     - `description`: Optional
     - `sort_order`: Number for ordering
   
2. For each menu item:
   - Go to **Table Editor** → **menu_items**
   - Insert row with:
     - `restaurant_id`: (UUID from Step 1)
     - `category_id`: (UUID from category created above)
     - `name`: Item name
     - `description`: Item description
     - `price`: Price in cents (e.g., 14900 for ₡149.00)
     - `image`: Image URL
     - `is_available`: `true`
     - `is_recommended`: `true` for recommended items

### Step 4: Create Tables (Optional)

If you want to support table-based ordering:

1. Go to **Table Editor** → **tables**
2. Insert rows for each table number:
   - `restaurant_id`: (UUID from Step 1)
   - `table_number`: 1, 2, 3, etc.
   - `seats`: Number of seats
   - `status`: `"available"`

### Step 5: Test the Integration

1. **Frontend Test:**
   - Open: `http://localhost:3000/?res=olivegarden`
   - Verify the menu loads correctly
   - Check that colors and logo display properly

2. **Backend Test:**
   - Test API endpoint: `GET /api/restaurants/olivegarden`
   - Should return restaurant data with menu items

3. **Order Test:**
   - Try creating an order
   - Verify items are saved correctly

## Summary Checklist

When adding a new restaurant, make sure you:

- [ ] ✅ Created menu file: `frontend/restaurants/olivegarden.ts`
- [ ] ✅ Added to `frontend/restaurants/index.ts` (export)
- [ ] ✅ Added restaurant row in Supabase `restaurants` table with correct `slug`
- [ ] ✅ Copied UUID from Supabase restaurant entry
- [ ] ✅ Added UUID mapping in `frontend/services/menuMapping.ts`
- [ ] ✅ Populated menu categories in `menu_categories` table
- [ ] ✅ Populated menu items in `menu_items` table
- [ ] ✅ Marked recommended items with `is_recommended = true`
- [ ] ✅ Created tables (if needed) in `tables` table
- [ ] ✅ Tested frontend: `?res=olivegarden`
- [ ] ✅ Tested backend API endpoint
- [ ] ✅ Tested order creation

## Common Issues

### Issue: Restaurant not loading
- **Check:** Is the slug in `restaurants/index.ts` exactly matching the Supabase `slug`?
- **Check:** Is the UUID mapping correct in `menuMapping.ts`?

### Issue: Menu items not showing
- **Check:** Are menu items linked to the correct `restaurant_id`?
- **Check:** Are items marked as `is_available = true`?

### Issue: Recommended items not showing
- **Check:** Are recommended items marked with `is_recommended = true`?

## SQL Example for Supabase

If you prefer SQL, you can run this in Supabase SQL Editor:

```sql
-- Insert restaurant
INSERT INTO restaurants (name, slug, colors, logo)
VALUES (
  'Olive Garden',
  'olivegarden',
  '{"primary": "#2563EB", "primary-dark": "#1d4ed8", "background": "#F8FAFC"}'::jsonb,
  NULL
)
RETURNING id;  -- This will show you the UUID to use in menuMapping.ts
```

Then use the returned UUID in your `menuMapping.ts` file.
