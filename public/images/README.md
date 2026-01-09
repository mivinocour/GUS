# Restaurant Images Folder

Each restaurant has its own folder to keep images organized!

## Folder Structure:

```
public/images/
  ├── sikwa/              ← Sikwa restaurant images
  │   ├── logo.png
  │   ├── cacao.jpg
  │   └── cujiniquil.jpg
  ├── gus/                 ← Gus restaurant images
  │   ├── logo.png
  │   ├── burger.jpg
  │   └── cheesecake.jpg
  └── yourrestaurant/      ← Add more restaurants here!
      └── ...
```

## How to Use:

1. **Add images to the restaurant's folder:**
   - Place Sikwa images in `/public/images/sikwa/`
   - Place Gus images in `/public/images/gus/`
   - Create a new folder for each new restaurant

2. **Reference them in your restaurant files** (`restaurants/yourrestaurant.ts`):
   ```typescript
   // For Sikwa (in restaurants/sikwa.ts)
   logo: '/images/sikwa/logo.png',
   image: '/images/sikwa/cacao.jpg',
   
   // For Gus (in restaurants/gus.ts)
   logo: '/images/gus/logo.png',
   image: '/images/gus/burger.jpg',
   ```

3. **File naming tips:**
   - Use lowercase and hyphens: `menu-item-1.jpg` (not `Menu Item 1.jpg`)
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Keep file sizes reasonable (under 500KB for faster loading)
   - You can use simple names like `logo.png` or `burger.jpg` since they're already in restaurant folders

## Benefits of This Structure:

✅ **Organized** - Each restaurant's images are separate  
✅ **Easy to find** - No need for long prefixes like `sikwa-logo.png`  
✅ **Scalable** - Easy to add new restaurants  
✅ **Clean** - Simple filenames within each folder

## Notes:

- Images in `/public/images/restaurant-name/` are served at `/images/restaurant-name/filename.jpg`
- Vite automatically serves files from the `public` folder
- After adding images, restart your dev server if needed
