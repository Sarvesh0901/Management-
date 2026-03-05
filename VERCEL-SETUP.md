# 🚀 Quick Vercel Setup Guide

## For FRONTEND Project (antd-next-app)

### Step 1: Add Environment Variable to Vercel

1. Go to: **https://vercel.com/dashboard**
2. Select your **FRONTEND** project
3. Click **Settings** → **Environment Variables**
4. Click **Add New...**
5. Add this variable:

| Field | Value |
|-------|-------|
| **Name** | `NEXT_PUBLIC_API_URL` |
| **Value** | `https://management-backend-seven.vercel.app/api` |
| **Environment** | ✅ Production |

6. Click **Save**

### Step 2: Deploy Your Frontend

```bash
cd /home/adeptek-sarvesh/Documents/TSX/antd-next-app

# If not already deployed, import your Git repo to Vercel first
# Then push to deploy:
git add .
git commit -m "Configure frontend with backend API"
git push origin main
```

Vercel will automatically build and deploy (~1-3 minutes).

---

## For BACKEND Project (backend)

### Required Environment Variables on Vercel:

Go to your **BACKEND** project on Vercel and add these:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://btssudloqhllcubutgaz.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_jgH5gt2hY6PfDEf3NH6vag_4IuBxXHX` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (full key from .env) |
| `JWT_SECRET` | `SARVESh@123` |
| `FRONTEND_URL` | `http://localhost:3000` (or your frontend URL) |
| `NODE_ENV` | `production` |

---

## ✅ Verify Everything Works

### 1. Test Backend Directly
```bash
curl https://management-backend-seven.vercel.app/
# Should return: {"message":"Secure Portal API","version":"1.0.0","status":"running"}
```

### 2. Test Frontend Locally
```bash
cd antd-next-app
npm run dev
# Visit http://localhost:3000
# Try signing up or loggingging in
```

### 3. Check Network Tab
- Open DevTools (F12)
- Network tab
- Should see requests to: `https://management-backend-seven.vercel.app/api/...`

---

## 📊 Summary

| Project | What to Add on Vercel | Where |
|---------|----------------------|-------|
| **Frontend** | `NEXT_PUBLIC_API_URL=https://management-backend-seven.vercel.app/api` | Frontend project settings |
| **Backend** | All Supabase + JWT variables | Backend project settings |

---

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Check that `NEXT_PUBLIC_API_URL` is set in FRONTEND project on Vercel
- Redeploy frontend after adding the variable
- Check browser console for errors

**Backend returning 500 error?**
- Check all backend environment variables are set correctly
- Especially `SUPABASE_SERVICE_ROLE_KEY` (must be complete)
- Check Vercel deployment logs

**CORS errors?**
- Set `FRONTEND_URL` in backend to match your frontend URL
- For local: `http://localhost:3000`
- For production: Your actual Vercel frontend URL
