# Local Preview Setup Guide

This guide provides multiple ways to preview your Science 1B website locally on Windows.

## Option 1: Full Development Environment (Recommended)

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (or use the provided setup script)

### Quick Setup
```bash
# 1. Install dependencies for both frontend and backend
npm install

# 2. Setup database and start development servers
./scripts/setup-dev.bat
./scripts/start-dev.bat
```

### Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database Studio**: http://localhost:5555 (Prisma Studio)

## Option 2: XAMPP Static Preview

### Prerequisites
- XAMPP installed and running
- Node.js for building the frontend

### Setup Steps

#### 1. Build Frontend for Static Export
```bash
cd frontend
npm install
npm run build
npm run export
```

#### 2. Configure XAMPP
1. Open XAMPP Control Panel
2. Start Apache
3. Copy the built files to XAMPP:
   ```bash
   # Copy the static export to XAMPP htdocs
   xcopy "frontend\out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y
   ```

#### 3. Start Backend Separately
```bash
cd backend-prisma
npm install
npm run dev
```

#### 4. Access URLs
- **Frontend**: http://localhost/science-1b/
- **Backend API**: http://localhost:3001

## Option 3: XAMPP with Custom Port

### Setup
1. **Configure Apache in XAMPP**:
   - Edit `C:\xampp\apache\conf\httpd.conf`
   - Change `Listen 80` to `Listen 8080`
   - Change `ServerName localhost:80` to `ServerName localhost:8080`

2. **Build and Deploy**:
   ```bash
   cd frontend
   npm run build
   npm run export
   xcopy "frontend\out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y
   ```

3. **Start Backend**:
   ```bash
   cd backend-prisma
   npm run dev
   ```

### Access URLs
- **Frontend**: http://localhost:8080/science-1b/
- **Backend API**: http://localhost:3001

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/science1b_db"
PORT=3001
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost/science-1b,http://localhost:8080/science-1b
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill process using port 3000
   netstat -ano | findstr :3000
   taskkill /PID <PID_NUMBER> /F
   ```

2. **Database Connection Issues**:
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in backend .env file
   - Run: `cd backend-prisma && npx prisma db push`

3. **XAMPP Apache Won't Start**:
   - Check if port 80 is in use
   - Use port 8080 instead
   - Run XAMPP as Administrator

4. **Frontend Build Errors**:
   ```bash
   cd frontend
   rm -rf .next
   npm run build
   ```

### Performance Tips

1. **For Development**: Use Option 1 (Full Development)
2. **For Client Preview**: Use Option 2 (XAMPP Static)
3. **For Production-like Testing**: Use Option 3 (XAMPP Custom Port)

## Quick Commands

### Start Everything (Development)
```bash
# Terminal 1
cd backend-prisma && npm run dev

# Terminal 2  
cd frontend && npm run dev
```

### Build for XAMPP
```bash
cd frontend && npm run build && npm run export
xcopy "frontend\out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y
cd backend-prisma && npm run dev
```

### Reset Everything
```bash
# Clean builds
cd frontend && rm -rf .next out
cd backend-prisma && rm -rf dist

# Rebuild
cd frontend && npm run build
cd backend-prisma && npm run build
```

## Features Available

### Development Mode (Option 1)
- ✅ Full Next.js features (SSR, API routes)
- ✅ Hot reload
- ✅ TypeScript checking
- ✅ All animations and interactions
- ✅ Database integration

### XAMPP Mode (Options 2 & 3)
- ✅ Static site preview
- ✅ Basic functionality
- ⚠️ No server-side rendering
- ⚠️ Limited API integration
- ✅ Good for client previews

Choose the option that best fits your needs!
