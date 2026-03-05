# Frontend-Backend Connection Guide

## ✅ Connection Configured!

Your Next.js frontend is now configured to connect to your Vercel backend at:
**https://management-backend-seven.vercel.app/api**

---

## 🔄 Switching Between Environments

### **Production Mode (Using Vercel Backend)**

Your `.env.local` is currently set to use the Vercel backend:

```env
NEXT_PUBLIC_API_URL=https://management-backend-seven.vercel.app/api
```

This means all API calls will go to your deployed backend on Vercel.

### **Development Mode (Using Local Backend)**

If you want to test with a local backend server:

1. Start your local backend:
   ```bash
   cd ../backend
   npm start
   ```

2. Update `.env.local`:
   ```env
   # NEXT_PUBLIC_API_URL=https://management-backend-seven.vercel.app/api
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Restart your frontend dev server:
   ```bash
   npm run dev
   ```

---

## 🚀 Quick Start

### 1. Start the Frontend

```bash
cd /home/adeptek-sarvesh/Documents/TSX/antd-next-app
npm run dev
```

Your frontend will be available at: **http://localhost:3000**

### 2. Test the Connection

The frontend will now make API calls to:
- `https://management-backend-seven.vercel.app/api/auth/login`
- `https://management-backend-seven.vercel.app/api/auth/signup`
- `https://management-backend-seven.vercel.app/api/articles`
- etc.

---

## 🔧 Troubleshooting Connection Issues

### Issue: "Failed to fetch" or Network Error

**Solution:** 
1. Check that your Vercel backend is deployed successfully
2. Visit https://management-backend-seven.vercel.app/ in your browser
3. You should see: `{"message":"Secure Portal API","version":"1.0.0","status":"running"}`
4. If not, check your Vercel deployment logs

### Issue: CORS Error

**Solution:**
Your backend already has CORS configured, but if you see CORS errors:
1. Make sure `FRONTEND_URL` in Vercel backend environment variables is set correctly
2. For development: `http://localhost:3000`
3. For production: Your actual frontend URL (e.g., `https://your-app.vercel.app`)

### Issue: 404 Not Found

**Solution:**
Check that the API routes exist in your backend:
- `/api/auth/login` - Should exist in `routes/auth.js`
- `/api/auth/signup` - Should exist in `routes/auth.js`
- `/api/articles` - Should exist in `routes/article.js`

---

## 📝 Testing API Endpoints

### Using Browser DevTools:

1. Open your frontend app: http://localhost:3000
2. Open DevTools (F12)
3. Go to **Network** tab
4. Try logging in or signing up
5. Check the requests being made to `https://management-backend-seven.vercel.app/api`

### Using curl:

```bash
# Test backend is running
curl https://management-backend-seven.vercel.app/

# Test login endpoint
curl -X POST https://management-backend-seven.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"mobile":"1234567890","pin":"1234"}'
```

---

## 🔐 Environment Variables Checklist

Make sure these are set in BOTH places:

### Frontend (.env.local):
- ✅ `NEXT_PUBLIC_API_URL` = `https://management-backend-seven.vercel.app/api`

### Backend (Vercel Environment Variables):
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `JWT_SECRET`
- ✅ `FRONTEND_URL` = `http://localhost:3000` (or your frontend URL)
- ✅ `NODE_ENV` = `production`

---

## 📦 Deployment Workflow

### When You Update Frontend Code:

```bash
# Make your changes, then:
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will automatically deploy your frontend updates.

### When You Update Backend Code:

```bash
cd ../backend
git add .
git commit -m "Update backend"
git push origin main
```

Vercel will automatically deploy your backend updates.

---

## 🎯 Current Configuration Summary

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend (Local)** | http://localhost:3000 | ✅ Running locally |
| **Frontend (Production)** | Deploy to Vercel | Auto-deploys on git push |
| **Backend (Production)** | https://management-backend-seven.vercel.app | ✅ Deployed on Vercel |
| **Backend (Local)** | http://localhost:5000 | Available for testing |

---

## 💡 Pro Tips

1. **Always test locally first** before deploying to production
2. **Use separate environment variables** for development and production
3. **Check Vercel logs** if something isn't working: `vercel logs`
4. **Keep both frontend and backend in sync** - update Git repositories together
5. **Test API endpoints directly** using curl or Postman before testing through the UI

---

## 🆘 Need Help?

If you're still having connection issues:

1. Check Vercel deployment logs at: https://vercel.com/dashboard
2. Verify all environment variables are set correctly
3. Test the backend directly: https://management-backend-seven.vercel.app/
4. Check browser console for specific error messages
