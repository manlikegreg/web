#!/bin/bash

# Science 1B Website - Development Startup Script
# This script starts both frontend and backend development servers

set -e

echo "🚀 Starting Science 1B Website Development Servers"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        print_warning "Killing process on port $port (PID: $pid)"
        kill -9 $pid
    fi
}

# Check if ports are available
if check_port 3000; then
    print_warning "Port 3000 is already in use. Killing existing process..."
    kill_port 3000
fi

if check_port 5000; then
    print_warning "Port 5000 is already in use. Killing existing process..."
    kill_port 5000
fi

# Function to start backend
start_backend() {
    print_status "Starting backend server..."
    cd backend-prisma
    
    # Check if .env exists
    if [ ! -f .env ]; then
        print_error "Backend environment file not found. Please run setup first."
        exit 1
    fi
    
    # Start backend in background
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    sleep 5
    
    # Check if backend is running
    if curl -s http://localhost:5000/health > /dev/null; then
        print_success "Backend server started successfully on http://localhost:5000"
    else
        print_error "Backend server failed to start"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
}

# Function to start frontend
start_frontend() {
    print_status "Starting frontend server..."
    cd frontend
    
    # Check if .env.local exists
    if [ ! -f .env.local ]; then
        print_warning "Frontend environment file not found. Creating from example..."
        cp env.local.example .env.local
    fi
    
    # Start frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for frontend to start
    print_status "Waiting for frontend to start..."
    sleep 10
    
    # Check if frontend is running
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend server started successfully on http://localhost:3000"
    else
        print_error "Frontend server failed to start"
        kill $FRONTEND_PID 2>/dev/null
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
}

# Function to cleanup on exit
cleanup() {
    print_status "Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    print_success "Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start servers
start_backend
start_frontend

echo
print_success "🎉 Development servers are running!"
echo
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo "API Health: http://localhost:5000/health"
echo
echo "Press Ctrl+C to stop all servers"
echo

# Keep script running
wait
