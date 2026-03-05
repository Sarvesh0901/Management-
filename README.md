# 🎨 Frontend - Quick Start

Next.js frontend with Ant Design components.

## ⚡ Quick Start

### 1️⃣ Install Dependencies
```bash
cd antd-next-app
npm install
```

### 2️⃣ Configure Backend URL
Check `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

Frontend runs on http://localhost:3000

---

## 🔐 Login

Use these credentials (after backend setup):
- Mobile: `1234567890`, PIN: `1234`
- Mobile: `0987654321`, PIN: `4321` (admin)

---

## 📁 Project Structure

```
antd-next-app/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── context/          # React contexts
│   └── utils/            # API client, auth helpers
├── .env.local            # Environment variables
└── package.json
```

---

**Backend**: See `../backend/README.md` for server setup
