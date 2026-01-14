# Railway Environment Variables Guide

## Important: Frontend vs Backend

**Key Point:** The frontend **NEVER** talks directly to the database. Only the backend does!

```
Frontend → Backend API → Database (Supabase)
```

So:
- ✅ **Backend** needs `DATABASE_URL` (to connect to Supabase)
- ❌ **Frontend** does NOT need `DATABASE_URL` (it talks to backend, not database)

---

## Backend Service Variables

### Required Variable:

**`DATABASE_URL`**
- **Value:** `postgresql://postgres.trwdlyjuqtozfanwkxht:hellomich0102@aws-1-us-east-1.pooler.supabase.com:6543/postgres`
- **What it does:** Tells the backend how to connect to your Supabase database
- **Where to set:** Backend service → Variables tab

**That's it for backend!** Just this one variable.

---

## Frontend Service Variables

### Required Variable:

**`VITE_API_BASE_URL`**
- **Value:** Your deployed backend URL (e.g., `https://your-backend.railway.app`)
- **What it does:** Tells the frontend where to send API requests
- **Where to set:** Frontend service → Variables tab
- **Important:** No trailing slash! Use `https://your-backend.railway.app` not `https://your-backend.railway.app/`

**That's it for frontend!** Just this one variable.

---

## Step-by-Step: Setting Variables in Railway

### For Backend Service:

1. In Railway, click on your **backend service**
2. Go to **Variables** tab
3. Click **"+ New Variable"**
4. Enter:
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://postgres.trwdlyjuqtozfanwkxht:hellomich0102@aws-1-us-east-1.pooler.supabase.com:6543/postgres`
5. Click **"Add"**
6. Railway will automatically redeploy with the new variable

### For Frontend Service:

1. **First, deploy backend and get its URL**
2. In Railway, click on your **frontend service**
3. Go to **Variables** tab
4. Click **"+ New Variable"**
5. Enter:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend-service-name.railway.app` (use your actual backend URL)
6. Click **"Add"**
7. Railway will automatically redeploy with the new variable

---

## Summary Table

| Service | Variable Name | Value | Required? |
|--------|--------------|------|-----------|
| **Backend** | `DATABASE_URL` | `postgresql://postgres.trwdlyjuqtozfanwkxht:hellomich0102@aws-1-us-east-1.pooler.supabase.com:6543/postgres` | ✅ Yes |
| **Frontend** | `VITE_API_BASE_URL` | `https://your-backend.railway.app` | ✅ Yes |
| **Frontend** | `DATABASE_URL` | ❌ **NO - Don't set this!** | ❌ No |

---

## How to Find Your Backend URL

1. In Railway, click on your **backend service**
2. Go to **Settings** tab
3. Scroll to **"Networking"** section
4. You'll see a **"Public Domain"** or **"Generate Domain"** button
5. Click it to get your backend URL
6. It will look like: `https://your-service-name.railway.app`

**Copy this URL** - you'll need it for `VITE_API_BASE_URL` in the frontend!

---

## Verification

### Check Backend is Connected to Database:

1. Visit: `https://your-backend.railway.app/health`
2. Should return:
   ```json
   {
     "status": "healthy",
     "message": "Server is running successfully",
     "database": "connected"
   }
   ```
3. If `"database": "connected"` → ✅ Backend is connected!

### Check Frontend Can Reach Backend:

1. Open your frontend URL in browser
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Try creating an order
5. Look for any errors mentioning the API URL
6. If no errors → ✅ Frontend is connected!

---

## Common Mistakes

### ❌ Setting DATABASE_URL in Frontend
- **Why wrong:** Frontend never connects to database directly
- **What happens:** Variable is ignored (frontend doesn't use it)
- **Fix:** Only set `VITE_API_BASE_URL` in frontend

### ❌ Wrong Backend URL Format
- **Wrong:** `http://localhost:8000` (local URL)
- **Wrong:** `https://backend.railway.app/` (trailing slash)
- **Right:** `https://backend.railway.app` (no trailing slash)

### ❌ Using Wrong Database URL
- Make sure you're using the **pooler** URL (port 6543) for Supabase
- Your URL looks correct: `aws-1-us-east-1.pooler.supabase.com:6543`

---

## Quick Checklist

**Backend:**
- [ ] Root directory set to `backend`
- [ ] `DATABASE_URL` variable set
- [ ] Service is running (check logs)
- [ ] Health check returns `"database": "connected"`

**Frontend:**
- [ ] Root directory set to `frontend`
- [ ] `VITE_API_BASE_URL` variable set (to backend URL)
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npx serve -s dist -l $PORT`
- [ ] Service is running (check logs)

---

## Need Help?

If backend health check shows `"database": "disconnected"`:
1. Check `DATABASE_URL` is set correctly
2. Check Railway logs for connection errors
3. Verify Supabase allows connections from Railway's IPs
4. Make sure you're using the pooler URL (port 6543)

If frontend can't reach backend:
1. Verify `VITE_API_BASE_URL` is set correctly
2. Check backend is actually running
3. Verify backend URL has no trailing slash
4. Check browser console for CORS errors
