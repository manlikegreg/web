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
