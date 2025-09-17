# 🚀 Simple Installation Guide

Since automated installation isn't working in your environment, here's a simple manual approach:

## Step 1: Install Node.js (Required)

### Download Node.js
1. Go to: **https://nodejs.org/**
2. Click the **LTS version** (green button - currently v18.17.0)
3. Download the Windows Installer (.msi file)

### Install Node.js
1. Run the downloaded .msi file
2. Follow the installation wizard
3. **IMPORTANT**: Make sure "Add to PATH" is checked (it usually is by default)
4. Click "Install" and wait for completion
5. **RESTART YOUR COMPUTER** (this is important!)

### Verify Installation
After restarting, open a new PowerShell window and run:
```bash
node --version
npm --version
```
You should see version numbers.

## Step 2: Install Project Dependencies

Once Node.js is installed, run these commands:

```bash
# Navigate to your project
cd C:\Users\simon\science-1b-website

# Install all dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ..\backend-prisma
npm install

# Go back to root
cd ..
```

## Step 3: Start the Website

### Option 1: Frontend Only (Easiest)
```bash
cd frontend
npm run dev
```
**Access**: http://localhost:3000

### Option 2: Full Website
```bash
# Terminal 1 - Backend
cd backend-prisma
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```
**Access**: 
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Option 3: XAMPP Preview
```bash
# Build for XAMPP
cd frontend
npm run build

# Copy to XAMPP (make sure XAMPP is running)
xcopy "out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y

# Start backend
cd ..\backend-prisma
npm run dev
```
**Access**: http://localhost/science-1b/

## What You'll See

Your Science 1B website will have:
- ✅ Beautiful, responsive design
- ✅ Smooth animations
- ✅ Photo gallery
- ✅ Article system
- ✅ Contact forms
- ✅ Mobile-friendly navigation

## Troubleshooting

### "node is not recognized"
- Make sure you restarted your computer after installing Node.js
- Check if Node.js is in your PATH

### "npm is not recognized"
- Usually comes with Node.js
- Try reinstalling Node.js

### Port already in use
```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Build errors
```bash
# Clean and rebuild
cd frontend
rm -rf .next
npm run build
```

## Quick Commands

```bash
# Check if Node.js is working
node --version
npm --version

# Install everything
npm install

# Start frontend
cd frontend && npm run dev

# Start backend
cd backend-prisma && npm run dev

# Build for XAMPP
cd frontend && npm run build && npm run export
```

## Next Steps

1. **Install Node.js** from https://nodejs.org/
2. **Restart your computer**
3. **Run the commands** above
4. **Open http://localhost:3000** in your browser

That's it! Your Science 1B website will be running! 🎉









