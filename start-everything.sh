#!/bin/bash

echo "=========================================="
echo "🚀 Starting Secure Portal Application"
echo "=========================================="
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

echo "📊 Step 1: Checking Backend Setup..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please ensure your Supabase credentials are configured."
    exit 1
else
    echo "✅ Configuration found"
fi

cd ..

echo ""
echo "🗄️  Step 2: Database Check Required!"
echo ""
echo "⚠️  IMPORTANT: Have you run the SQL schema in Supabase?"
echo ""
echo "If NO, please do this NOW:"
echo "1. Go to: https://supabase.com/dashboard/project/btssudloqhllcubutgaz/sql/new"
echo "2. Copy content from: supabase-schema.sql"
echo "3. Paste and click 'Run'"
echo ""
read -p "Press Enter after you've run the SQL schema or if already done..."

echo ""
echo "🔧 Step 3: Testing Supabase Connection..."
cd backend
npm run test
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Database connection failed!"
    echo ""
    echo "Please check:"
    echo "1. SQL schema was executed in Supabase dashboard"
    echo "2. Supabase credentials are correct in .env file"
    echo "3. Your internet connection is working"
    echo ""
    echo "Run the SQL schema here:"
    echo "https://supabase.com/dashboard/project/btssudloqhllcubutgaz/sql/new"
    exit 1
fi
cd ..

echo ""
echo "🚀 Step 4: Starting Backend Server..."
if check_port 5000; then
    echo "⚠️  Port 5000 is already in use."
    echo "   Do you want to kill the existing process? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        pkill -f "node server.js"
        sleep 2
        echo "✅ Process killed"
    else
        echo "❌ Cannot start backend. Please stop the other process first."
        exit 1
    fi
fi

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

echo "✅ Backend server starting (PID: $BACKEND_PID)"
echo ""

# Wait for backend to be ready
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Test if backend is responding
echo ""
echo "🧪 Testing backend connection..."
max_attempts=10
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if curl -s http://localhost:5000 > /dev/null 2>&1; then
        echo "✅ Backend is responding!"
        break
    fi
    attempt=$((attempt + 1))
    sleep 1
done

if [ $attempt -eq $max_attempts ]; then
    echo "⚠️  Backend didn't respond in time, but continuing anyway..."
fi

echo ""
echo "🎨 Step 5: Starting Frontend Server..."
cd antd-next-app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
    echo "✅ Created .env.local"
fi

cd ..

# Start frontend in background
cd antd-next-app
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Frontend server starting (PID: $FRONTEND_PID)"
echo ""

# Wait for frontend
echo "⏳ Waiting for frontend to initialize..."
sleep 3

echo ""
echo "=========================================="
echo "✨ SUCCESS! Application is running!"
echo "=========================================="
echo ""
echo "📡 Backend API:  http://localhost:5000"
echo "🌐 Frontend App: http://localhost:3000"
echo ""
echo "🔐 Login Credentials:"
echo "   Mobile: 1234567890"
echo "   PIN:    1234"
echo ""
echo "OR"
echo ""
echo "   Mobile: 0987654321"
echo "   PIN:    4321"
echo ""
echo "📝 Next Steps:"
echo "   1. Open: http://localhost:3000/login"
echo "   2. Enter credentials above"
echo "   3. Click 'Sign In'"
echo ""
echo "💡 Press Ctrl+C to stop all servers"
echo "=========================================="
echo ""

# Keep script running
wait
