# AI-Powered Menu JSON Generation Guide

This guide shows you how to use AI tools (Claude, ChatGPT, Gemini, etc.) to automatically convert restaurant menu PDFs into the JSON structure needed for this app.

## 🤖 **AI Prompt Template**

Copy and paste this prompt into Claude, ChatGPT, or Gemini:

```
I need to convert a restaurant menu PDF into a JSON structure for a React app. 

Here is the menu text from the PDF:
[PASTE MENU TEXT HERE]

Please convert this into the following JSON structure:

{
  "name": "Restaurant Name",
  "logo": null,
  "colors": {
    "primary": "#2563EB",
    "primary-dark": "#1d4ed8",
    "background": "#F8FAFC"
  },
  "recommendations": [
    {
      "id": "unique-id",
      "name": "Item Name",
      "description": "Item description",
      "price": 4500,
      "category": "Category Name",
      "image": "/images/restaurant-key/filename.jpg"
    }
  ],
  "menu": [
    {
      "id": "category-id",
      "title": "Category Title",
      "items": [
        {
          "id": "unique-item-id",
          "name": "Item Name",
          "description": "Item description",
          "price": 4500,
          "image": "/images/restaurant-key/filename.jpg",
          "category": "Category Name"
        }
      ]
    }
  ]
}

Requirements:
1. Extract restaurant name from the menu
2. **IMPORTANT: Preserve the exact categories/sections as they appear in the original PDF menu. Do NOT reorganize or group items into different categories. Use the category names exactly as written in the menu (e.g., if the menu says "Aperitivos", use "Aperitivos", not "Entradas"). Respect the original menu structure completely.**
3. For each item, create:
   - A unique ID (lowercase, use hyphens: "hamburguesa-gus", "pasta-carbonara")
   - Name (exact from menu)
   - Description (ingredients or description from menu)
   - Price (convert to number, remove currency symbols - if in USD, multiply by exchange rate to get local currency)
   - Category (the section it belongs to)
   - Image path: Use placeholder "/images/RESTAURANT-KEY/filename.jpg" (I'll add images later)
4. Select 2-3 popular/signature items for "recommendations" array
5. Use consistent category names (match the "title" field in menu sections)
6. If prices are missing, use 0 and I'll fill them in later
7. Generate TypeScript-ready JSON (no trailing commas)
8. **IMPORTANT: Wrap the JSON in a TypeScript const declaration and export statement:**
   - Start with: `const RESTAURANT_KEY: RestaurantData = {`
   - End with: `};` followed by `export default RESTAURANT_KEY;`
   - Use the restaurant key (lowercase, hyphens) as the const name (e.g., `const filippo`, `const sikwa`)

Please output the complete TypeScript code with const declaration and export, not just JSON.
```

---

## 📝 **Step 4: Refine the Output**

After AI generates the JSON:

1. **Check for errors:**
   - All IDs are unique
   - Prices are numbers (not strings)
   - Categories match between menu sections and items
   - No syntax errors

2. **Update image paths: (including restaurant logo)**
   - Replace placeholder paths with actual filenames once you add images
   - Format: `/images/RESTAURANT-KEY/filename.jpg`

3. **Set colors:**
   - Update `colors.primary` to match restaurant branding
   - Use a color picker tool to get hex codes from their logo/website

4. **Add logo:**
   - If restaurant has a logo: `logo: '/images/RESTAURANT-KEY/logo.png'`
   - If no logo: `logo: null`

---

## 📁 **Step 5: Create Restaurant File**

1. **Create the file:**
   ```
   restaurants/RESTAURANT-KEY.ts
   ```
   (Use lowercase, no spaces: `sikwa`, `el-patio`, `cafe-madrid`)

2. **Add the complete code structure:**
   ```typescript
   import { RestaurantData } from '../data';

   const RESTAURANT_KEY: RestaurantData = {
     // Paste AI-generated data here (should already include const and export if AI followed instructions)
   };

   export default RESTAURANT_KEY;
   ```
   
   **Note:** If the AI output already includes the `const` declaration and `export default` statement, you can paste it directly. Otherwise, wrap the JSON as shown above.
   
   **Critical:** Make sure the file ends with `export default RESTAURANT_KEY;` - this is required for the restaurant to be accessible!

3. **Register in index:**
   - Open `restaurants/index.ts`
   - Add import: `import RESTAURANT_KEY from './RESTAURANT-KEY';`
   - Add to object: `RESTAURANT_KEY,`

---

## 🎨 **Step 6: Add Images**

1. **Create folder:**
   ```
   public/images/RESTAURANT-KEY/
   ```

2. **Add images:**
   - Logo: `logo.png` or `logo.jpg`
   - Menu items: Use descriptive names (`burger.jpg`, `pasta.jpg`, etc.)

3. **Update JSON:**
   - Replace image paths with actual filenames
   - Format: `/images/RESTAURANT-KEY/filename.jpg`

---

## 🔧 **Advanced: Customizing the AI Prompt**

### **For Spanish Menus:**
Add to prompt:
```
The menu is in Spanish. Keep all names and descriptions in Spanish. 
Use Spanish category names: "Entradas", "Platos Fuertes", "Postres", "Bebidas".
```

### **For Menus with Prices in Different Currencies:**
Add to prompt:
```
Prices are in [CURRENCY]. Convert to Costa Rican Colones (CRC) using exchange rate [RATE].
Example: $10 USD = 5000 CRC (adjust rate as needed).
```

### **For Complex Menus with Modifiers:**
Add to prompt:
```
Some items may have modifiers (add-ons, sizes, etc.). Include these in the description field.
Example: "Hamburguesa - Add queso +500, Add bacon +800"
```

---

## 📊 **JSON Structure Reference**

### **Complete Example:**

```typescript
import { RestaurantData } from '../data';

const exampleRestaurant: RestaurantData = {
  name: 'Restaurant Name',
  logo: '/images/example-restaurant/logo.png', // or null
  colors: {
    primary: '#6a994e',        // Main brand color
    'primary-dark': '#386641',   // Darker shade for hover
    background: '#fffaf0',        // Background color
  },
  recommendations: [
    {
      id: 'signature-item-1',
      name: 'Signature Dish',
      description: 'Our most popular dish',
      price: 7500,
      category: 'Platos Fuertes',
      image: '/images/example-restaurant/signature-dish.jpg',
    },
    // Add 2-3 more recommendations
  ],
  menu: [
    {
      id: 'starters',
      title: 'Entradas',
      items: [
        {
          id: 'item-1',
          name: 'Bruschetta',
          description: 'Fresh tomatoes, basil, garlic',
          price: 4500,
          image: '/images/example-restaurant/bruschetta.jpg',
          category: 'Entradas',
        },
        // More items...
      ],
    },
    // More categories...
  ],
};

export default exampleRestaurant;
```

---

## ✅ **Checklist Before Finalizing**

- [ ] File starts with `import { RestaurantData } from '../data';`
- [ ] Const declaration: `const RESTAURANT_KEY: RestaurantData = {`
- [ ] File ends with `export default RESTAURANT_KEY;` (REQUIRED!)
- [ ] All IDs are unique and lowercase with hyphens
- [ ] Prices are numbers (not strings with currency symbols)
- [ ] Image paths use format `/images/RESTAURANT-KEY/filename.jpg`
- [ ] Categories match between sections and items
- [ ] Restaurant name is correct
- [ ] Colors match restaurant branding
- [ ] Logo path is correct (or null)
- [ ] File is registered in `restaurants/index.ts`
- [ ] Images are added to `public/images/RESTAURANT-KEY/`
- [ ] Test the link: `http://localhost:3000/?res=RESTAURANT-KEY`

---

## 🚀 **Quick Start Template**

**Copy this minimal template to start:**

```typescript
import { RestaurantData } from '../data';

const RESTAURANT_KEY: RestaurantData = {
  name: '',
  logo: null,
  colors: {
    primary: '#2563EB',
    'primary-dark': '#1d4ed8',
    background: '#F8FAFC',
  },
  recommendations: [],
  menu: [],
};

export default RESTAURANT_KEY;
```

**Important:** Always include the `export default RESTAURANT_KEY;` statement at the end - without it, the restaurant won't be accessible!

Then use AI to fill in the data!

---

## 💡 **Tips for Best Results**

1. **Clean PDFs work best** - If PDF is messy, clean it up first
2. **Provide context** - Tell AI the restaurant's cuisine type, location, etc.
3. **Review prices** - AI might misinterpret currency or formatting
4. **Check descriptions** - AI might miss ingredients or details
5. **Test incrementally** - Add a few items first, test, then add more
6. **Use consistent naming** - Keep restaurant key consistent across files and folders

---

## 🆘 **Troubleshooting**

**Problem: AI generates invalid JSON**
- Ask AI to validate JSON syntax
- Use a JSON validator tool online
- Check for trailing commas

**Problem: Prices are wrong**
- Specify currency conversion rate explicitly
- Manually fix prices after generation

**Problem: Categories don't match**
- Ask AI to use consistent category names
- Manually standardize after generation

**Problem: Missing items**
- Provide more context to AI
- Break large menus into sections
- Generate in multiple passes

**Problem: Restaurant not accessible (404 or blank page)**
- Check that file ends with `export default RESTAURANT_KEY;`
- Verify const name matches restaurant key (e.g., `const filippo` for `?res=filippo`)
- Ensure file is registered in `restaurants/index.ts`
- Make sure import statement is correct: `import RESTAURANT_KEY from './RESTAURANT-KEY';`

---

**Happy automating! 🎉**
