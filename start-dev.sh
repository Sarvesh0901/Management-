#!/bin/bash

echo "🚀 Starting Secure Portal Development Servers..."
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "antd-next-app" ]; then
    echo "❌ Error: Please run this script from the TSX directory"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Check MongoDB
echo "📊 Checking MongoDB..."
if sudo systemctl is-active --quiet mongod; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Attempting to start..."
    if sudo systemctl start mongod 2>/dev/null; then
        echo "✅ MongoDB started successfully"
    else
        echo "❌ Failed to start MongoDB. Please install/start it manually."
        echo "   Install guide: https://www.mongodb.com/docs/manual/installation/"
    fi
fi
echo ""

# Check and seed backend database
echo "🔧 Backend Setup..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from .env.example..."
    cp .env.example .env
fi

# Seed database if it's empty
echo "🌱 Checking if database needs seeding..."
MONGO_URI=$(grep MONGODB_URI .env | cut -d '=' -f2)
if mongosh --quiet "$MONGO_URI" --eval "db.users.count()" 2>/dev/null | grep -q "^0$"; then
    echo "📝 Seeding database with sample data..."
    npm run seed
else
    echo "✅ Database already has data"
fi

cd ..
echo ""

# Start backend server
echo "🚀 Starting Backend Server..."
if check_port 5000; then
    echo "⚠️  Port 5000 is already in use. Skipping backend start."
else
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend server starting on http://localhost:5000 (PID: $BACKEND_PID)"
fi
echo ""

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
sleep 5

# Start frontend server
echo "🎨 Starting Frontend Server..."
cd antd-next-app

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
fi

if check_port 3000; then
    echo "⚠️  Port 3000 is already in use. Skipping frontend start."
else
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend server starting on http://localhost:3000 (PID: $FRONTEND_PID)"
fi

cd ..
echo ""

echo "=========================================="
echo "✨ Development servers are starting up!"
echo "=========================================="
echo ""
echo "📡 Backend API:  http://localhost:5000"
echo "🌐 Frontend App: http://localhost:3000"
echo ""
echo "🔑 Default Login Credentials:"
echo "   User 1: Mobile: 1234567890, PIN: 1234"
echo "   User 2: Mobile: 0987654321, PIN: 4321"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for any process to exit
wait
