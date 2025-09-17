@echo off
echo ========================================
echo Science 1B Website - Essential Dependencies
echo ========================================
echo.

echo Installing only the essential dependencies for the website...
echo.

REM Check if Node.js is installed
echo Checking Node.js...
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Node.js is already installed
    node --version
) else (
    echo ❌ Node.js not found
    echo.
    echo Please install Node.js manually:
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version (green button)
    echo 3. Run the installer with default settings
    echo 4. Restart your computer
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installing Project Dependencies
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
echo Setting Up Environment
echo ========================================
echo.

echo Creating environment files...

REM Create frontend .env.local
if not exist "frontend\.env.local" (
    echo Creating frontend environment file...
    echo NEXT_PUBLIC_API_URL=http://localhost:3001 > frontend\.env.local
)

REM Create backend .env
if not exist "backend-prisma\.env" (
    echo Creating backend environment file...
    echo DATABASE_URL="postgresql://postgres:password@localhost:5432/science1b_db" > backend-prisma\.env
    echo PORT=3001 >> backend-prisma\.env
    echo FRONTEND_URL=http://localhost:3000 >> backend-prisma\.env
    echo CORS_ORIGIN=http://localhost:3000,http://localhost/science-1b >> backend-prisma\.env
)

echo.
echo ========================================
echo Building Project
echo ========================================
echo.

echo Building frontend...
cd frontend
call npm run build
if %errorLevel% neq 0 (
    echo WARNING: Frontend build failed - this is normal if you don't have a database yet
    echo You can still preview the frontend
)

echo Building backend...
cd ..\backend-prisma
call npm run build
if %errorLevel% neq 0 (
    echo WARNING: Backend build failed - this is normal if you don't have a database yet
    echo You can still preview the frontend
)

cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.

echo ✅ Essential dependencies installed successfully!
echo.
echo Next steps:
echo 1. For frontend-only preview: cd frontend && npm run dev
echo 2. For full website: scripts\start-website.bat
echo 3. For XAMPP preview: scripts\setup-xampp.bat
echo.
echo URLs:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:3001 (if database is set up)
echo.
echo To start the website now, run:
echo   scripts\start-website.bat
echo.
pause









