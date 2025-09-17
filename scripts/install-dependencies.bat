@echo off
echo ========================================
echo Science 1B Website - Dependency Installer
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo WARNING: Not running as administrator. Some installations may require admin rights.
    echo.
)

echo This script will install all required dependencies for the Science 1B website.
echo.
echo Dependencies to install:
echo - Node.js (JavaScript runtime)
echo - PostgreSQL (Database)
echo - Git (Version control)
echo - Visual Studio Code (Code editor)
echo.
pause

echo.
echo ========================================
echo Step 1: Installing Node.js
echo ========================================
echo.

REM Check if Node.js is already installed
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo Node.js is already installed:
    node --version
    echo.
) else (
    echo Node.js not found. Please install manually:
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version (green button)
    echo 3. Run the installer with default settings
    echo 4. Restart your computer after installation
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2: Installing PostgreSQL
echo ========================================
echo.

REM Check if PostgreSQL is already installed
psql --version >nul 2>&1
if %errorLevel% equ 0 (
    echo PostgreSQL is already installed:
    psql --version
    echo.
) else (
    echo PostgreSQL not found. Installing...
    echo.
    echo Please download and install PostgreSQL:
    echo 1. Go to https://www.postgresql.org/download/windows/
    echo 2. Download the installer
    echo 3. Run the installer with these settings:
    echo    - Port: 5432 (default)
    echo    - Password: Remember this password!
    echo    - Locale: Default
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 3: Installing Git
echo ========================================
echo.

REM Check if Git is already installed
git --version >nul 2>&1
if %errorLevel% equ 0 (
    echo Git is already installed:
    git --version
    echo.
) else (
    echo Git not found. Installing...
    echo.
    echo Please download and install Git:
    echo 1. Go to https://git-scm.com/download/win
    echo 2. Download the installer
    echo 3. Run the installer with default settings
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 4: Installing Project Dependencies
echo ========================================
echo.

echo Installing root dependencies...
call npm install
if %errorLevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorLevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo Installing backend dependencies...
cd ..\backend-prisma
call npm install
if %errorLevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo Step 5: Setting Up Database
echo ========================================
echo.

echo Setting up PostgreSQL database...
cd backend-prisma

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    echo DATABASE_URL="postgresql://postgres:password@localhost:5432/science1b_db" > .env
    echo PORT=3001 >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo CORS_ORIGIN=http://localhost:3000,http://localhost/science-1b >> .env
    echo.
    echo IMPORTANT: Please edit backend-prisma\.env and update the DATABASE_URL
    echo with your PostgreSQL password!
    echo.
)

echo Generating Prisma client...
call npx prisma generate
if %errorLevel% neq 0 (
    echo WARNING: Failed to generate Prisma client
    echo You may need to set up the database manually
)

echo Pushing database schema...
call npx prisma db push
if %errorLevel% neq 0 (
    echo WARNING: Failed to push database schema
    echo Please check your PostgreSQL connection and .env file
)

echo Seeding database...
call npx prisma db seed
if %errorLevel% neq 0 (
    echo WARNING: Failed to seed database
    echo You can run this manually later
)

cd ..

echo.
echo ========================================
echo Step 6: Building Project
echo ========================================
echo.

echo Building frontend...
cd frontend
call npm run build
if %errorLevel% neq 0 (
    echo WARNING: Frontend build failed
    echo You can try building manually later
)

cd ..

echo Building backend...
cd backend-prisma
call npm run build
if %errorLevel% neq 0 (
    echo WARNING: Backend build failed
    echo You can try building manually later
)

cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo All dependencies have been installed and configured.
echo.
echo Next steps:
echo 1. Edit backend-prisma\.env with your PostgreSQL password
echo 2. Run: scripts\quick-preview.bat
echo 3. Choose your preview method
echo.
echo URLs:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:3001
echo - XAMPP: http://localhost/science-1b/
echo.
echo If you encounter any issues, check the troubleshooting guide.
echo.
pause


