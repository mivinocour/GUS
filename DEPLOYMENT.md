# Deployment Guide

## Current State

### ✅ Backend → Database Connection
**YES, if `DATABASE_URL` is set in your `.env` file, your backend IS connected to the database.**

- The backend reads `DATABASE_URL` from environment variables on startup
- It automatically connects to Supabase when the server starts
- You can verify this by checking the startup logs: `✅ Database initialized successfully`

### 🔄 Frontend → Backend Connection
**Currently:** Frontend connects to `http://localhost:8000` (your local backend)

**When deployed:** Frontend will connect to your deployed backend URL

---

## Platform Recommendation: Railway (Host Both!)

### 🎯 **Best Option: Railway for Backend + Frontend**

**Why Railway?**
- ✅ Can host **both** backend (FastAPI) and frontend (React) in one place
- ✅ Simplest setup - one platform, one dashboard
- ✅ Free tier: $5/month credit (often covers small apps)
- ✅ Excellent for Python/FastAPI backends
- ✅ Auto-deploys from GitHub
- ✅ Great documentation and support

**Cost:** ~$5-10/month for both (often free with credits)

### Alternative Options

**Render (Can host both):**
- ✅ Free tier available (sleeps after 15min inactivity)
- ✅ Can host backend + frontend
- ⚠️ Slower cold starts on free tier
- ⚠️ More complex setup than Railway
- **Cost:** Free tier or $7/month per service

**Vercel (Frontend only) + Railway (Backend):**
- ✅ Vercel is best-in-class for React/Next.js
- ✅ Railway for backend
- ⚠️ Two platforms to manage
- ⚠️ More setup complexity
- **Cost:** Free (Vercel) + $5/month (Railway) = $5/month

**Render for both:**
- ✅ Free tier
- ⚠️ Slower, more complex
- **Cost:** Free or $7/month per service

### 🏆 **My Recommendation: Railway for Everything**

For your use case (FastAPI + React), Railway is the sweet spot:
- One platform, one bill, one dashboard
- Easiest to set up and maintain
- Great developer experience
- Scales well as you grow

---

## Deployment Strategy

### Option 1: Deploy Now (Recommended for Learning)
**Pros:**
- Learn deployment early
- Test production environment
- Get feedback from real users
- Catch deployment issues early

**Cons:**
- Need to update deployments when you make changes
- May have some downtime during updates

**Best for:** Learning, testing, early demos

### Option 2: Wait Until Feature-Complete
**Pros:**
- Fewer deployments
- More polished before going live

**Cons:**
- Learn deployment issues late
- Harder to test production environment
- May have bigger problems to fix

**Best for:** Internal tools, very early stage

### 🎯 My Recommendation: **Deploy Now**
Deploying early helps you:
1. Learn the deployment process
2. Test in a real environment
3. Catch issues before they become critical
4. Get comfortable with the workflow

---

## How Deployment Works

### Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ──────> │   Backend   │ ──────> │  Database   │
│  (Vercel)   │         │  (Railway)  │         │  (Supabase) │
└─────────────┘         └─────────────┘         └─────────────┘
     ↓                        ↓                        ↓
  Static files          Python server          PostgreSQL
  (React build)         (FastAPI)             (Cloud)
```

### Step-by-Step Deployment

#### Option A: Railway for Both (Recommended) ⭐

**Deploy Backend on Railway:**

1. **Create Railway account** - https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Add Service** → **GitHub Repo** → Select your repo
4. **Configure Backend Service:**
   - Root directory: `backend/`
   - Build command: (auto-detected, or `pip install -r requirements.txt`)
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Set environment variable:**
   - Key: `DATABASE_URL`
   - Value: Your Supabase connection string
6. **Deploy!** Get backend URL: `https://your-backend.railway.app`

**Deploy Frontend on Railway (Same Project):**

1. **In same Railway project**, click **+ New** → **GitHub Repo**
2. **Select same repo** (or create new service)
3. **Configure Frontend Service:**
   - Root directory: `frontend/`
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist -l $PORT`
   - OR use Railway's static site preset
4. **Set environment variable:**
   - Key: `VITE_API_BASE_URL`
   - Value: `https://your-backend.railway.app` (from step above)
5. **Deploy!** Get frontend URL: `https://your-frontend.railway.app`

**Benefits:**
- ✅ Both services in one project
- ✅ One dashboard to manage everything
- ✅ Shared environment variables
- ✅ Easy to see logs for both

#### Option B: Railway (Backend) + Vercel (Frontend)

**Backend:** Same as Option A above

**Frontend on Vercel:**

1. **Create Vercel account** - https://vercel.com
2. **New Project** → **Import Git Repository**
3. **Configure:**
   - Root directory: `frontend/`
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Set environment variable:**
   - Key: `VITE_API_BASE_URL`
   - Value: Your Railway backend URL
5. **Deploy!**

**Benefits:**
- ✅ Vercel's excellent CDN for frontend
- ✅ Faster frontend deployments
- ⚠️ Two platforms to manage

#### Option C: Render for Both

**Similar to Railway but:**
- Free tier sleeps after 15min (slower)
- More complex setup
- Good if you need free tier and don't mind cold starts

---

## What Needs to Change When Deploying

### Backend Changes: **NONE** ✅
- Code stays the same
- Just set `DATABASE_URL` environment variable in deployment platform
- Backend automatically connects on startup

### Frontend Changes: **Environment Variable** ✅
- Code already updated to use `VITE_API_BASE_URL`
- Just set this variable in your deployment platform
- Points to your deployed backend URL

### Database: **NONE** ✅
- Supabase is already in the cloud
- Same connection string works everywhere
- No changes needed

---

## Deployment Workflow

### Initial Deployment

```bash
# 1. Deploy Backend
# - Go to Railway
# - Connect repo
# - Set DATABASE_URL
# - Deploy
# - Copy backend URL: https://your-backend.railway.app

# 2. Deploy Frontend
# - Go to Vercel
# - Connect repo
# - Set VITE_API_BASE_URL = https://your-backend.railway.app
# - Deploy
# - Get frontend URL: https://your-frontend.vercel.app
```

### Updating After Local Changes

**Option A: Automatic (Recommended)**
- Connect both Railway and Vercel to GitHub
- Push changes to GitHub
- Both platforms auto-deploy on push
- **No manual steps needed!**

**Option B: Manual**
```bash
# 1. Make local changes
git add .
git commit -m "Your changes"
git push

# 2. Platforms auto-deploy (if connected to GitHub)
# OR manually trigger deployment in Railway/Vercel dashboard
```

---

## Environment Variables Summary

### Backend (Railway/Render/etc.)
```
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
```

### Frontend (Vercel/Netlify/etc.)
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

**Note:** In development, frontend defaults to `http://localhost:8000` if `VITE_API_BASE_URL` is not set.

---

## Testing Your Deployment

### 1. Test Backend
```bash
curl https://your-backend.railway.app/health
```
Should return: `{"status":"healthy","message":"...","database":"connected"}`

### 2. Test Frontend
- Visit your Vercel URL
- Try creating an order
- Check browser console for errors
- Verify orders appear in Supabase database

---

## Cost Estimates

### Free Tier (Good for Starting):
- **Railway:** $5/month (or free with limited usage)
- **Vercel:** Free for personal projects
- **Supabase:** Free tier (500MB database, 2GB bandwidth)

**Total: ~$5/month or FREE**

### When You Scale:
- Railway: Pay as you go (~$10-50/month)
- Vercel: Free tier is generous
- Supabase: Free tier → $25/month when you need more

---

## Troubleshooting

### Backend won't connect to database
- Check `DATABASE_URL` is set correctly in Railway
- Verify Supabase allows connections from Railway's IPs
- Check Railway logs for connection errors

### Frontend can't reach backend
- Verify `VITE_API_BASE_URL` is set in Vercel
- Check backend URL is correct (no trailing slash)
- Check CORS settings in backend (should allow `*` for now)

### Changes not showing up
- Rebuild frontend: `npm run build` locally to test
- Clear browser cache
- Check deployment logs in Railway/Vercel

---

## Next Steps

1. **Choose platforms:** Railway (backend) + Vercel (frontend)
2. **Deploy backend first:** Get the URL
3. **Deploy frontend:** Use backend URL in environment variable
4. **Test everything:** Create orders, verify database
5. **Set up auto-deploy:** Connect to GitHub for automatic deployments

---

## Quick Reference

| Component | Local | Production |
|-----------|-------|------------|
| **Backend URL** | `http://localhost:8000` | `https://your-app.railway.app` |
| **Frontend URL** | `http://localhost:3000` | `https://your-app.vercel.app` |
| **Database** | Same Supabase | Same Supabase |
| **DATABASE_URL** | `.env` file | Railway env var |
| **API URL** | Hardcoded localhost | Vercel env var |

---

**Ready to deploy?** Start with Railway for backend, then Vercel for frontend. Both have excellent free tiers and great documentation!
