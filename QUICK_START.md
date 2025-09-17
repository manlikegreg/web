# 🚀 Science 1B Website - Quick Start

## What You Need
1. ✅ **Node.js** - [Download here](https://nodejs.org/) (LTS version)
2. ✅ **XAMPP** - You already have this!

## 3-Step Setup

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the **LTS version** (green button)
3. Install with default settings
4. **Restart your computer** (important!)

### Step 2: Verify Installation
Open PowerShell and run:
```bash
node --version
npm --version
```
You should see version numbers.

### Step 3: Start the Website
```bash
# Navigate to your project
cd C:\Users\simon\science-1b-website

# Run the quick setup
scripts\quick-preview.bat
```

## What You'll Get

### Option 1: Full Development (Recommended)
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- ✅ Hot reload
- ✅ All features
- ✅ Database integration

### Option 2: XAMPP Preview
- **Frontend**: http://localhost/science-1b/
- **Backend**: http://localhost:3001
- ✅ Static preview
- ✅ Good for demos
- ✅ Works offline

## Troubleshooting

### "node is not recognized"
- Restart your computer
- Or manually add Node.js to PATH

### "Port already in use"
```bash
# Kill the process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### XAMPP Apache won't start
- Run XAMPP as Administrator
- Check if port 80 is free

## Features Included
- 🎨 Modern, responsive design
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-friendly
- 🖼️ Photo gallery with lightbox
- 📝 Article/blog system
- 📞 Contact forms
- 🎯 SEO optimized

## Need Help?
- **Installation**: `INSTALL_NODEJS.md`
- **Full Setup**: `SETUP_INSTRUCTIONS.md`
- **Local Preview**: `LOCAL_PREVIEW.md`

## Ready to Go?
1. Install Node.js
2. Run `scripts\quick-preview.bat`
3. Choose your preview method
4. Open the provided URLs

**That's it! Your Science 1B website is ready! 🎉**