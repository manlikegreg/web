#!/bin/bash

# Science 1B Website - Development Setup Script
# This script sets up the development environment for both frontend and backend

set -e

echo "🚀 Setting up Science 1B Website Development Environment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed. You'll need it for the backend."
        print_warning "Install from: https://www.postgresql.org/download/"
        return 1
    fi
    
    print_success "PostgreSQL is installed"
    return 0
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Create environment file if it doesn't exist
    if [ ! -f .env.local ]; then
        print_status "Creating frontend environment file..."
        cp env.local.example .env.local
        print_success "Created .env.local - please update with your settings"
    else
        print_success "Frontend environment file already exists"
    fi
    
    cd ..
    print_success "Frontend setup complete"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend-prisma
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Create environment file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating backend environment file..."
        cp env.example .env
        print_warning "Created .env - please update DATABASE_URL with your PostgreSQL connection"
    else
        print_success "Backend environment file already exists"
    fi
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npm run db:generate
    
    cd ..
    print_success "Backend setup complete"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    cd backend-prisma
    
    # Check if DATABASE_URL is set
    if [ -f .env ]; then
        source .env
        if [ -z "$DATABASE_URL" ] || [ "$DATABASE_URL" = "postgresql://username:password@localhost:5432/science_1b_db?schema=public" ]; then
            print_warning "Please update DATABASE_URL in backend-prisma/.env with your PostgreSQL connection"
            print_warning "Example: postgresql://your_username:your_password@localhost:5432/science_1b_db?schema=public"
            return 1
        fi
    else
        print_error "Backend environment file not found. Run setup again."
        return 1
    fi
    
    # Push database schema
    print_status "Pushing database schema..."
    npm run db:push
    
    # Seed database
    print_status "Seeding database..."
    npm run db:seed
    
    cd ..
    print_success "Database setup complete"
}

# Main setup function
main() {
    print_status "Starting development environment setup..."
    
    # Check prerequisites
    check_node
    check_postgres
    
    # Setup frontend
    setup_frontend
    
    # Setup backend
    setup_backend
    
    # Setup database (optional)
    if check_postgres; then
        read -p "Do you want to setup the database now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            setup_database
        else
            print_warning "Skipping database setup. You can run it later with: cd backend-prisma && npm run db:push && npm run db:seed"
        fi
    else
        print_warning "Skipping database setup. Install PostgreSQL and run: cd backend-prisma && npm run db:push && npm run db:seed"
    fi
    
    echo
    print_success "Development environment setup complete!"
    echo
    echo "Next steps:"
    echo "1. Update environment files with your settings:"
    echo "   - frontend/.env.local"
    echo "   - backend-prisma/.env"
    echo
    echo "2. Start the development servers:"
    echo "   Frontend: cd frontend && npm run dev"
    echo "   Backend:  cd backend-prisma && npm run dev"
    echo
    echo "3. Open your browser:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5000/health"
    echo
    echo "Happy coding! 🎉"
}

# Run main function
main "$@"
