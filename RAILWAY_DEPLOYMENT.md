# Railway Deployment - Step by Step

## Prerequisites

- ✅ GitHub account
- ✅ Your code pushed to GitHub
- ✅ Supabase database URL ready

---

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with GitHub (recommended - easier deployment)

---

## Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub
4. Select your `GUS` repository
5. Railway will create a new project

---

## Step 3: Deploy Backend (FastAPI)

### 3.1 Add Backend Service

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"** (or **"Empty Service"** if you want to configure manually)
3. Select your `GUS` repository again

### 3.2 Configure Backend

Railway should auto-detect Python, but verify these settings:

1. Click on the **backend service** in your project
2. Go to **Settings** tab
3. Set **Root Directory**: `backend`
4. Go to **Deploy** tab
5. Verify **Start Command**: 
   ```
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
   (Railway sets `$PORT` automatically)

### 3.3 Set Environment Variables

1. In the backend service, go to **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Key**: `DATABASE_URL`
   - **Value**: Your Supabase connection string
     - Example: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`
4. Click **"Add"**

### 3.4 Deploy Backend

1. Railway will automatically start building
2. Watch the **Deploy Logs** tab for progress
3. Wait for: `✅ Application startup complete`
4. Copy the **URL** from the service (e.g., `https://your-backend.railway.app`)

**Save this backend URL - you'll need it for the frontend!**

---

## Step 4: Deploy Frontend (React)

### 4.1 Add Frontend Service

1. In the **same Railway project**, click **"+ New"**
2. Select **"GitHub Repo"**
3. Select your `GUS` repository again
4. This creates a second service in the same project

### 4.2 Configure Frontend

1. Click on the **frontend service**
2. Go to **Settings** tab
3. Set **Root Directory**: `frontend`
4. Go to **Deploy** tab
5. Set **Build Command**: 
   ```
   npm install && npm run build
   ```
6. Set **Start Command**:
   ```
   npx serve -s dist -l $PORT
   ```
   (This serves your built React app)

### 4.3 Set Environment Variables

1. In the frontend service, go to **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL from Step 3.4
     - Example: `https://your-backend.railway.app`
     - ⚠️ **No trailing slash!**
4. Click **"Add"**

### 4.4 Deploy Frontend

1. Railway will automatically start building
2. Watch the **Deploy Logs** tab
3. Wait for: `✅ Build complete` and `✅ Server running`
4. Copy the **URL** from the service (e.g., `https://your-frontend.railway.app`)

---

## Step 5: Test Your Deployment

### 5.1 Test Backend

Open in browser or use curl:
```bash
https://your-backend.railway.app/health
```

Should return:
```json
{
  "status": "healthy",
  "message": "Server is running successfully",
  "database": "connected"
}
```

### 5.2 Test Frontend

1. Open your frontend URL in browser
2. Try creating an order
3. Check browser console (F12) for errors
4. Verify orders appear in Supabase database

---

## Step 6: Set Up Auto-Deploy (Optional but Recommended)

Railway auto-deploys by default when you:
1. Push to your main/master branch
2. Or create a pull request

**To verify:**
1. Go to your service → **Settings** → **Source**
2. Make sure **"Auto Deploy"** is enabled

**Now when you push to GitHub, Railway automatically redeploys!**

---

## Troubleshooting

### Backend won't start

**Check:**
1. **Logs** tab in Railway - look for errors
2. **Start command** is correct: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Root directory** is set to `backend`
4. **DATABASE_URL** is set correctly

**Common issues:**
- Missing dependencies → Check `requirements.txt` exists
- Port error → Make sure using `$PORT` not hardcoded `8000`
- Database connection → Verify `DATABASE_URL` is correct

### Frontend shows blank page

**Check:**
1. **Build logs** - did build succeed?
2. **Start command** - using `npx serve -s dist -l $PORT`
3. **Root directory** - set to `frontend`
4. **VITE_API_BASE_URL** - points to backend URL (no trailing slash)

**Common issues:**
- Build failed → Check npm dependencies
- Wrong start command → Must serve `dist` folder
- API errors → Check `VITE_API_BASE_URL` is correct

### Frontend can't reach backend

**Check:**
1. Backend URL is correct in `VITE_API_BASE_URL`
2. Backend is actually running (check backend service logs)
3. CORS is enabled in backend (should be `allow_origins=["*"]`)

---

## Custom Domains (Optional)

### Add Custom Domain

1. Go to service → **Settings** → **Networking**
2. Click **"Generate Domain"** or **"Custom Domain"**
3. Follow instructions to add DNS records

---

## Monitoring & Logs

### View Logs

1. Click on any service
2. Go to **Deploy Logs** tab for build logs
3. Go to **Logs** tab for runtime logs

### Monitor Usage

1. Go to project dashboard
2. See resource usage (CPU, memory, network)
3. Track spending

---

## Cost Management

### Free Tier
- $5/month in credits
- Usually enough for small apps
- Pay-as-you-go after credits

### Monitor Spending
1. Go to project → **Settings** → **Usage**
2. Set spending limits if needed
3. Get alerts when approaching limits

---

## Quick Reference

| What | Where | Value |
|------|-------|-------|
| **Backend Root** | Settings → Root Directory | `backend` |
| **Backend Start** | Deploy → Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Backend Env Var** | Variables | `DATABASE_URL` = your Supabase URL |
| **Frontend Root** | Settings → Root Directory | `frontend` |
| **Frontend Build** | Deploy → Build Command | `npm install && npm run build` |
| **Frontend Start** | Deploy → Start Command | `npx serve -s dist -l $PORT` |
| **Frontend Env Var** | Variables | `VITE_API_BASE_URL` = backend URL |

---

## Next Steps After Deployment

1. ✅ Test everything works
2. ✅ Set up custom domain (optional)
3. ✅ Enable auto-deploy (should be on by default)
4. ✅ Monitor logs for any issues
5. ✅ Share your deployed app URL!

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check logs in Railway dashboard for specific errors

**You're all set! 🚀**
