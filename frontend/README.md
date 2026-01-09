# Frontend - React + Vite

## Quick Start

1. **Make sure you're in the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will be available at `http://localhost:3000`

## Troubleshooting

### Blank Page / Localhost is Blank

1. **Check you're running from the frontend directory:**
   ```bash
   pwd  # Should show: .../GUS/frontend
   ```

2. **Check the browser console for errors:**
   - Open DevTools (F12 or Cmd+Option+I)
   - Look for red error messages in the Console tab

3. **Clear browser cache and hard refresh:**
   - Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)

4. **Check if the dev server is actually running:**
   - You should see output like: `Local: http://localhost:3000/`

### Port Already in Use

If port 3000 is taken, you can change it in `vite.config.ts`:
```typescript
server: {
  port: 3001,  // Change to any available port
}
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.
