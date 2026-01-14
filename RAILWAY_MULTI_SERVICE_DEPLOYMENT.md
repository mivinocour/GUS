# Railway Multi-Service Deployment Guide
## Backend + Customer Frontend + Admin Dashboard

## Architecture Overview

```
┌──────────────────┐
│  Customer App    │ ───┐
│  (React/Vite)    │    │
└──────────────────┘    │
                        ├──> ┌──────────────┐      ┌──────────────┐
┌──────────────────┐    │    │   Backend    │ ───> │   Database   │
│  Admin Dashboard │ ───┘    │   (FastAPI)  │      │  (Supabase)  │
│  (React/Vite)    │          └──────────────┘      └──────────────┘
└──────────────────┘
```

**Best Practice:** All three services in **one Railway project** for easier management.

---

## Deployment Strategy

### ✅ Recommended: Separate Services in Same Project

**Why:**
- ✅ Easier to manage (one dashboard)
- ✅ Shared environment variables
- ✅ Independent scaling
- ✅ Separate URLs for each app
- ✅ Better security (admin dashboard separate from customer app)

**Structure:**
```
Railway Project: "GUS Restaurant System"
├── Service 1: Backend (FastAPI)
├── Service 2: Customer Frontend (React)
└── Service 3: Admin Dashboard (React)
```

---

## Step-by-Step Deployment

### Step 1: Prepare Your Repositories

**Option A: Dashboard in Same Repo (Recommended)**
- Move dashboard into your main repo: `GUS/admin-dashboard/`
- One repo = easier deployment
- Single source of truth

**Option B: Dashboard in Separate Repo**
- Keep dashboard in separate repo
- Deploy from different GitHub repos
- Still in same Railway project

**For this guide, I'll assume Option A (same repo).**

---

### Step 2: Deploy Backend Service

1. **In Railway, create new project** (or use existing)
2. **Add Service** → **GitHub Repo** → Select your `GUS` repo
3. **Configure Backend:**
   - **Settings** → **Root Directory:** `backend`
   - **Deploy** → **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Set Environment Variable:**
   - **Variables** → **+ New Variable**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://postgres.trwdlyjuqtozfanwkxht:hellomich0102@aws-1-us-east-1.pooler.supabase.com:6543/postgres`
5. **Generate Domain:**
   - **Settings** → **Networking** → **Generate Domain**
   - Copy the URL: `https://your-backend.railway.app`
   - **Save this URL!** You'll need it for both frontends

6. **Wait for deployment** and verify:
   - Visit: `https://your-backend.railway.app/health`
   - Should return: `{"status": "healthy", "database": "connected"}`

---

### Step 3: Deploy Customer Frontend

1. **In same Railway project**, click **"+ New"** → **GitHub Repo**
2. **Select same repo** (`GUS`)
3. **Configure Frontend:**
   - **Settings** → **Root Directory:** `frontend`
   - **Deploy** → **Build Command:** `npm install && npm run build`
   - **Deploy** → **Start Command:** `npx serve -s dist -l $PORT`
4. **Set Environment Variable:**
   - **Variables** → **+ New Variable**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend.railway.app` (from Step 2)
5. **Generate Domain:**
   - **Settings** → **Networking** → **Generate Domain**
   - Copy the URL: `https://your-customer-app.railway.app`

6. **Wait for deployment** and test

---

### Step 4: Deploy Admin Dashboard

#### If Dashboard is in Same Repo:

1. **In same Railway project**, click **"+ New"** → **GitHub Repo**
2. **Select same repo** (`GUS`)
3. **Configure Dashboard:**
   - **Settings** → **Root Directory:** `admin-dashboard` (or wherever you put it)
   - **Deploy** → **Build Command:** `npm install && npm run build`
   - **Deploy** → **Start Command:** `npx serve -s dist -l $PORT`
4. **Set Environment Variable:**
   - **Variables** → **+ New Variable**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend.railway.app` (same as customer frontend)
5. **Generate Domain:**
   - **Settings** → **Networking** → **Generate Domain**
   - Copy the URL: `https://your-admin-dashboard.railway.app`

#### If Dashboard is in Separate Repo:

1. **In same Railway project**, click **"+ New"** → **GitHub Repo**
2. **Select dashboard repo** (`gus-admin-main` or whatever it's called)
3. **Configure Dashboard:**
   - **Settings** → **Root Directory:** `.` (root of dashboard repo)
   - **Deploy** → **Build Command:** `npm install && npm run build`
   - **Deploy** → **Start Command:** `npx serve -s dist -l $PORT`
4. **Set Environment Variable:**
   - **Variables** → **+ New Variable**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend.railway.app`
5. **Generate Domain:**
   - **Settings** → **Networking** → **Generate Domain**
   - Copy the URL: `https://your-admin-dashboard.railway.app`

---

## Environment Variables Summary

### Backend Service
| Variable | Value | Required? |
|---------|-------|-----------|
| `DATABASE_URL` | `postgresql://postgres.trwdlyjuqtozfanwkxht:hellomich0102@aws-1-us-east-1.pooler.supabase.com:6543/postgres` | ✅ Yes |

### Customer Frontend Service
| Variable | Value | Required? |
|---------|-------|-----------|
| `VITE_API_BASE_URL` | `https://your-backend.railway.app` | ✅ Yes |

### Admin Dashboard Service
| Variable | Value | Required? |
|---------|-------|-----------|
| `VITE_API_BASE_URL` | `https://your-backend.railway.app` | ✅ Yes |

**Note:** Both frontends use the **same backend URL**!

---

## Recommended: Move Dashboard to Main Repo

### Why?
- ✅ One repo = easier deployment
- ✅ Single source of truth
- ✅ Easier to keep in sync
- ✅ Simpler CI/CD

### How to Move Dashboard:

```bash
# From your GUS repo root
cd /Users/michellevinocour/GUS

# Create admin-dashboard directory
mkdir -p admin-dashboard

# Copy dashboard files
cp -r /Users/michellevinocour/Desktop/gus-admin-main/* admin-dashboard/

# Update any import paths if needed
# Dashboard should now be at: GUS/admin-dashboard/
```

**Then deploy with root directory:** `admin-dashboard`

---

## Final Project Structure in Railway

```
Railway Project: "GUS Restaurant System"
│
├── Service: "backend"
│   ├── Root: backend/
│   ├── URL: https://gus-backend.railway.app
│   └── Variables:
│       └── DATABASE_URL
│
├── Service: "customer-frontend"
│   ├── Root: frontend/
│   ├── URL: https://gus-customer.railway.app
│   └── Variables:
│       └── VITE_API_BASE_URL → backend URL
│
└── Service: "admin-dashboard"
    ├── Root: admin-dashboard/ (or separate repo)
    ├── URL: https://gus-admin.railway.app
    └── Variables:
        └── VITE_API_BASE_URL → backend URL
```

---

## Testing After Deployment

### 1. Test Backend
```bash
curl https://your-backend.railway.app/health
```
Expected: `{"status": "healthy", "database": "connected"}`

### 2. Test Customer Frontend
- Visit customer frontend URL
- Try creating an order
- Verify it appears in database

### 3. Test Admin Dashboard
- Visit admin dashboard URL
- Check if it loads tables/analytics
- Verify it can read from database via backend API

---

## Cost Management

**Railway Pricing:**
- $5/month base credit
- Pay-as-you-go after credits
- Each service uses resources independently

**Estimated Costs:**
- **3 services (small):** ~$8-12/month
- **3 services (medium):** ~$20-30/month
- All services share the same $5 credit pool

**Tips:**
- Monitor usage in Railway dashboard
- Set spending limits
- Consider combining services if costs are high (not recommended for security)

---

## Security Best Practices

### ✅ Separate Admin Dashboard
- **Why:** Admin dashboard should be separate from customer app
- **Benefit:** Can restrict access, different authentication, separate domains

### ✅ Environment Variables
- Never commit `.env` files
- Use Railway's environment variables
- Different API keys for different environments

### ✅ CORS Configuration
- Backend should allow both frontend URLs
- Update CORS in `backend/main.py`:
  ```python
  allow_origins=[
    "https://your-customer-app.railway.app",
    "https://your-admin-dashboard.railway.app",
    "http://localhost:3000",  # For local dev
  ]
  ```

---

## Troubleshooting

### Dashboard Can't Reach Backend

**Check:**
1. `VITE_API_BASE_URL` is set correctly
2. Backend is actually running
3. CORS allows dashboard domain
4. No trailing slash in backend URL

### All Services Show Same URL

**Fix:**
- Each service needs its own domain
- Go to each service → Settings → Networking → Generate Domain

### Build Fails for Dashboard

**Check:**
1. Root directory is correct
2. `package.json` exists in root directory
3. Build command is correct: `npm install && npm run build`
4. Check build logs for specific errors

---

## Quick Checklist

**Backend:**
- [ ] Root: `backend/`
- [ ] Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Variable: `DATABASE_URL`
- [ ] Health check works

**Customer Frontend:**
- [ ] Root: `frontend/`
- [ ] Build: `npm install && npm run build`
- [ ] Start: `npx serve -s dist -l $PORT`
- [ ] Variable: `VITE_API_BASE_URL` → backend URL

**Admin Dashboard:**
- [ ] Root: `admin-dashboard/` (or separate repo root)
- [ ] Build: `npm install && npm run build`
- [ ] Start: `npx serve -s dist -l $PORT`
- [ ] Variable: `VITE_API_BASE_URL` → backend URL

---

## Next Steps

1. ✅ Move dashboard to main repo (recommended)
2. ✅ Deploy backend first
3. ✅ Deploy customer frontend
4. ✅ Deploy admin dashboard
5. ✅ Test all three services
6. ✅ Update CORS in backend to allow both frontend URLs
7. ✅ Set up custom domains (optional)

**You're ready to deploy! 🚀**
