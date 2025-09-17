# Installation Guide

This guide will help you set up the Science 1B website locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd science-1b-website
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set up Environment Variables

#### Frontend Environment

```bash
cd frontend
cp env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend Environment

```bash
cd backend
cp env.example .env
```

Edit `.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=science_1b_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_URL=postgresql://your_db_user:your_db_password@localhost:5432/science_1b_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Set up Database

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE science_1b_db;
CREATE USER science_1b_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE science_1b_db TO science_1b_user;
\q
```

#### Run Migrations and Seed Data

```bash
cd backend
npm run db:setup
npm run db:migrate
npm run db:seed
```

### 5. Start Development Servers

#### Option 1: Start Both Servers (Recommended)

```bash
# From root directory
npm run dev
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

#### Option 2: Start Servers Separately

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Verify Installation

1. **Frontend**: Visit http://localhost:3000
2. **Backend API**: Visit http://localhost:5000/health
3. **Database**: Check if tables were created successfully

## Development Commands

### Frontend Commands

```bash
cd frontend

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Backend Commands

```bash
cd backend

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Database
npm run db:setup     # Create database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed sample data

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Root Commands

```bash
# From root directory
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run test         # Run all tests
npm run lint         # Lint all code
npm run format       # Format all code
```

## Project Structure

```
science-1b-website/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── tests/              # Test files
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Utility functions
│   └── scripts/            # Database scripts
├── docs/                   # Documentation
└── package.json           # Root package.json
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   
   # Kill process using port 5000
   npx kill-port 5000
   ```

2. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

3. **Node Modules Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

### Getting Help

- Check the console for error messages
- Review the logs in terminal
- Check database connection
- Verify environment variables

## Next Steps

1. **Customize Content**: Update placeholder content with real data
2. **Add Features**: Implement additional functionality as needed
3. **Deploy**: Follow the deployment guide in `docs/deployment.md`
4. **Monitor**: Set up monitoring and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs/` folder
