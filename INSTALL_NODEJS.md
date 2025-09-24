# Install Node.js - Quick Guide

## Why You Need Node.js
Node.js is required to run the Science 1B website. It provides:
- `npm` package manager
- JavaScript runtime for the backend
- Build tools for the frontend

## Installation Steps

### 1. Download Node.js
- Go to: https://nodejs.org/
- Click the **LTS version** (Long Term Support) - this is the green button
- The LTS version is more stable and recommended

### 2. Install Node.js
- Run the downloaded `.msi` file
- Follow the installation wizard
- **IMPORTANT**: Make sure "Add to PATH" is checked (it usually is by default)
- Click "Install" and wait for completion

### 3. Verify Installation
Open a **new** PowerShell window and type:
```bash
node --version
npm --version
```

You should see something like:
```
v18.17.0
9.6.7
```

### 4. If Commands Don't Work
If you get "command not found" errors:

1. **Restart your computer** (this updates the PATH)
2. **Or manually add to PATH**:
   - Open System Properties → Environment Variables
   - Add `C:\Program Files\nodejs\` to your PATH
   - Restart PowerShell

### 5. Test with Our Project
Once Node.js is working:
```bash
cd C:\Users\simon\science-1b-website
node --version
npm --version
```

### 6. Fix "setBlocking is not a function" Error
If you encounter the error `TypeError: process.stdout._handle.setBlocking is not a function`:

1. **Check your Node.js version**: `node --version`
2. **If version is below 18.17.0**: Download and install Node.js 20.0.0 LTS from https://nodejs.org/
3. **Restart your computer** after installation
4. **Verify the new version**: `node --version` should show 20.x.x
5. **Clear npm cache**: `npm cache clean --force`
6. **Reinstall dependencies**: 
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```
7. **Try running the project again**

## Alternative: Use Node Version Manager (Advanced)
If you want to manage multiple Node.js versions:
- Download from: https://github.com/coreybutler/nvm-windows
- Install and use: `nvm install 18.17.0`

## What's Next?
After installing Node.js:
1. Run: `scripts\quick-preview.bat`
2. Choose your preview method
3. Enjoy your Science 1B website!

## Need Help?
- Node.js Documentation: https://nodejs.org/docs/
- Common Issues: https://nodejs.org/en/docs/guides/troubleshooting/
- Our Setup Guide: `SETUP_INSTRUCTIONS.md`
