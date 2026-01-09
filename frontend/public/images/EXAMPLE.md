# Example: How to Switch from URLs to Local Images

## Step-by-Step Guide:

### 1. **Add Your Images to Restaurant Folder**
   - Copy your image files (`.jpg`, `.png`, etc.) into the restaurant's folder:
     - Sikwa images → `/public/images/sikwa/`
     - Gus images → `/public/images/gus/`
   
   **Example for Sikwa:**
   - `/public/images/sikwa/logo.png`
   - `/public/images/sikwa/cacao.jpg`
   - `/public/images/sikwa/cujiniquil.jpg`
   - `/public/images/sikwa/pez-gallo-pinto.jpg`
   - `/public/images/sikwa/frutas-bosque.jpg`

### 2. **Update Your Restaurant File**
   Open `restaurants/sikwa.ts` and change:

   **FROM (URL):**
   ```typescript
   logo: 'https://sikwa.cr/wp-content/uploads/2023/06/cropped-Logo-sikwa-sin-fondo-600x338.png',
   image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=600',
   ```

   **TO (Local - using restaurant folder):**
   ```typescript
   logo: '/images/sikwa/logo.png',
   image: '/images/sikwa/cacao.jpg',
   ```

### 3. **That's It!**
   - The `/images/restaurant-name/` path automatically points to `/public/images/restaurant-name/`
   - Vite serves these files when you run `npm run dev`
   - No need to import or configure anything else!

## Quick Reference:

| What You Want | Where to Put It | How to Reference It |
|--------------|----------------|---------------------|
| Sikwa Logo | `/public/images/sikwa/logo.png` | `logo: '/images/sikwa/logo.png'` |
| Sikwa Menu Item | `/public/images/sikwa/burger.jpg` | `image: '/images/sikwa/burger.jpg'` |
| Gus Logo | `/public/images/gus/logo.png` | `logo: '/images/gus/logo.png'` |
| Gus Menu Item | `/public/images/gus/pasta.jpg` | `image: '/images/gus/pasta.jpg'` |

## Example Structure:

```
public/images/
  ├── sikwa/
  │   ├── logo.png
  │   ├── cacao.jpg
  │   ├── cujiniquil.jpg
  │   └── pez-gallo-pinto.jpg
  └── gus/
      ├── logo.png
      ├── burger.jpg
      └── cheesecake.jpg
```

## Tips:

- ✅ Use simple filenames: `logo.png` or `burger.jpg` (no need for restaurant prefix since they're in folders)
- ✅ Keep images optimized (under 500KB each)
- ✅ Use `.webp` format for best compression (if possible)
- ✅ Use `.png` for logos with transparency
- ✅ Use `.jpg` for photos
- ✅ Create a new folder for each new restaurant you add