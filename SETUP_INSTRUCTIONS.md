# Science 1B Website - Complete Setup Instructions

## Step 1: Install Node.js (Required)

### Download and Install Node.js
1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the setup wizard
4. **Important**: Make sure to check "Add to PATH" during installation

### Verify Installation
Open a new PowerShell window and run:
```bash
node --version
npm --version
```

You should see version numbers for both commands.

## Step 2: Install XAMPP (You already have this!)

1. Make sure XAMPP is installed at `C:\xampp\`
2. Start XAMPP Control Panel
3. Start the **Apache** service

## Step 3: Set Up the Project

### Option A: Automatic Setup (Recommended)
```bash
# Open PowerShell in the project directory
cd C:\Users\simon\science-1b-website

# Install dependencies
npm install

# Run the quick preview script
scripts\quick-preview.bat
```

### Option B: Manual Setup

#### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 2. Install Backend Dependencies
```bash
cd ..\backend-prisma
npm install
```

#### 3. Choose Your Preview Method

**For Full Development (Recommended):**
```bash
# Terminal 1 - Backend
cd backend-prisma
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

**For XAMPP Preview:**
```bash
# Build for XAMPP
cd frontend
npm run build
npm run export

# Copy to XAMPP
xcopy "out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y

# Start backend
cd ..\backend-prisma
npm run dev
```
- Frontend: http://localhost/science-1b/
- Backend: http://localhost:3001

## Step 4: Database Setup (Optional for Frontend Preview)

If you want the full backend functionality:

### Install PostgreSQL
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the 'postgres' user

### Configure Database
1. Create a `.env` file in `backend-prisma/` folder:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/science1b_db"
PORT=3001
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost/science-1b
```

2. Set up the database:
```bash
cd backend-prisma
npx prisma db push
npx prisma db seed
```

## Troubleshooting

### Node.js Not Found
- Make sure Node.js is installed
- Restart your PowerShell/Command Prompt
- Check if Node.js is in your PATH: `echo $env:PATH`

### Port Already in Use
```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### XAMPP Apache Won't Start
- Run XAMPP as Administrator
- Check if port 80 is in use
- Try changing Apache port to 8080 in XAMPP settings

### Build Errors
```bash
# Clean and rebuild
cd frontend
rm -rf .next out
npm run build
```

## Quick Commands Reference

```bash
# Start everything (development)
scripts\quick-preview.bat

# Setup XAMPP preview
scripts\setup-xampp.bat

# Start backend only
scripts\start-backend.bat

# Build frontend
cd frontend && npm run build

# Build for XAMPP
cd frontend && npm run build && npm run export
```

## What You'll See

### Development Mode
- Full Next.js features
- Hot reload on changes
- All animations and interactions
- Database integration (if set up)

### XAMPP Mode
- Static site preview
- Good for client demos
- Works offline
- Limited to static features

## Next Steps

1. **Install Node.js** (if not already done)
2. **Run the setup**: `scripts\quick-preview.bat`
3. **Choose your preview method**
4. **Open the URLs** provided by the script

The website includes:
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Modern UI with TailwindCSS
- ✅ Framer Motion effects
- ✅ Gallery with lightbox
- ✅ Article system
- ✅ Contact forms
- ✅ Mobile-friendly navigation

Let me know if you need help with any of these steps!
