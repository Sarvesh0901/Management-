#!/bin/bash

# Quick Start Script for Frontend Development

echo "🚀 Starting Secure Portal Frontend..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found! Creating default configuration..."
    cat > .env.local << EOF
# Production (Vercel Backend)
NEXT_PUBLIC_API_URL=https://management-backend-seven.vercel.app/api

# Development (Local Backend) - Uncomment this line when testing locally
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
    echo "✅ Created .env.local with production URL"
    echo ""
fi

# Display current configuration
echo "📡 Current API Configuration:"
grep "NEXT_PUBLIC_API_URL" .env.local | grep -v "^#"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "🌐 Starting Next.js development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Backend API URL: https://management-backend-seven.vercel.app/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
