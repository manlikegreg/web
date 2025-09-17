# 🔧 Dependency Installation Guide

This guide will help you install all required dependencies for the Science 1B website.

## 🚀 Quick Installation (Recommended)

### Option 1: Automatic Installation
```bash
# Run the auto-installer (requires admin rights)
scripts\auto-install.bat
```

### Option 2: Step-by-Step Installation
```bash
# 1. Download all installers
scripts\download-installers.bat

# 2. Install dependencies
scripts\install-dependencies.bat
```

## 📋 Required Dependencies

### 1. Node.js (JavaScript Runtime)
- **Version**: 18.17.0 LTS or higher
- **Download**: https://nodejs.org/
- **Purpose**: Runs JavaScript, provides npm package manager
- **Installation**: Download .msi file, run installer with default settings

### 2. PostgreSQL (Database)
- **Version**: 15.4 or higher
- **Download**: https://www.postgresql.org/download/windows/
- **Purpose**: Stores website data (articles, gallery, students)
- **Installation**: Download installer, set password for 'postgres' user

### 3. Git (Version Control)
- **Version**: 2.41.0 or higher
- **Download**: https://git-scm.com/download/win
- **Purpose**: Version control, deployment
- **Installation**: Download .exe file, run with default settings

### 4. Visual Studio Code (Code Editor)
- **Version**: Latest stable
- **Download**: https://code.visualstudio.com/
- **Purpose**: Code editing, debugging
- **Installation**: Download .exe file, run installer

## 🛠️ Manual Installation Steps

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the **LTS version** (green button)
3. Run the installer
4. **Important**: Check "Add to PATH" during installation
5. Restart your computer

### Step 2: Install PostgreSQL
1. Go to https://www.postgresql.org/download/windows/
2. Download the installer
3. Run the installer with these settings:
   - Port: 5432 (default)
   - Password: **Remember this password!**
   - Locale: Default
   - Components: All selected

### Step 3: Install Git
1. Go to https://git-scm.com/download/win
2. Download the installer
3. Run with default settings
4. Restart your computer

### Step 4: Install VS Code
1. Go to https://code.visualstudio.com/
2. Download the installer
3. Run with default settings

## 🔧 Project Setup

### After Installing Dependencies
```bash
# Navigate to project directory
cd C:\Users\simon\science-1b-website

# Install project dependencies
npm install

# Set up database
cd backend-prisma
npx prisma db push
npx prisma db seed

# Start the website
cd ..
scripts\quick-preview.bat
```

## 🗄️ Database Configuration

### Default Database Settings
- **Host**: localhost
- **Port**: 5432
- **Username**: postgres
- **Password**: (set during PostgreSQL installation)
- **Database**: science1b_db

### Environment Variables
Create `backend-prisma\.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/science1b_db"
PORT=3001
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost/science-1b
```

## 🚨 Troubleshooting

### Common Issues

#### "node is not recognized"
- **Solution**: Restart your computer after installing Node.js
- **Alternative**: Manually add Node.js to PATH

#### "psql is not recognized"
- **Solution**: Restart your computer after installing PostgreSQL
- **Alternative**: Add PostgreSQL bin directory to PATH

#### "git is not recognized"
- **Solution**: Restart your computer after installing Git
- **Alternative**: Add Git bin directory to PATH

#### Port Already in Use
```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Kill process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

#### Database Connection Failed
1. Check if PostgreSQL service is running
2. Verify password in `.env` file
3. Test connection: `psql -U postgres -h localhost`

#### Build Errors
```bash
# Clean and rebuild
cd frontend
rm -rf .next out
npm run build

cd ../backend-prisma
rm -rf dist
npm run build
```

## ✅ Verification

### Check All Dependencies
```bash
# Check Node.js
node --version
npm --version

# Check PostgreSQL
psql --version

# Check Git
git --version

# Check VS Code
code --version
```

### Test Project
```bash
# Start the website
scripts\quick-preview.bat

# Check URLs
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# XAMPP: http://localhost/science-1b/
```

## 🎯 Next Steps

After installing all dependencies:

1. **Start the website**: `scripts\quick-preview.bat`
2. **Choose preview method**: Development or XAMPP
3. **Open the URLs**: Provided by the script
4. **Enjoy your Science 1B website!**

## 📞 Need Help?

- **Installation Issues**: Check troubleshooting section
- **Project Setup**: See `SETUP_INSTRUCTIONS.md`
- **Quick Start**: See `QUICK_START.md`
- **Local Preview**: See `LOCAL_PREVIEW.md`

## 🔄 Alternative: Use Package Managers

### Using Chocolatey (Advanced)
```bash
# Install Chocolatey first
# Then run:
choco install nodejs postgresql git vscode
```

### Using Winget (Windows 10/11)
```bash
# Install Node.js
winget install OpenJS.NodeJS

# Install PostgreSQL
winget install PostgreSQL.PostgreSQL

# Install Git
winget install Git.Git

# Install VS Code
winget install Microsoft.VisualStudioCode
```

---

**Ready to get started? Run `scripts\auto-install.bat` for automatic installation! 🚀**


