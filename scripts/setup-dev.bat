@echo off
REM Science 1B Website - Development Setup Script (Windows)
REM This script sets up the development environment for both frontend and backend

echo 🚀 Setting up Science 1B Website Development Environment
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [SUCCESS] Node.js is installed
node --version

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] PostgreSQL is not installed. You'll need it for the backend.
    echo [WARNING] Install from: https://www.postgresql.org/download/
    set POSTGRES_INSTALLED=0
) else (
    echo [SUCCESS] PostgreSQL is installed
    set POSTGRES_INSTALLED=1
)

REM Setup frontend
echo [INFO] Setting up frontend...
cd frontend

echo [INFO] Installing frontend dependencies...
call npm install

REM Create environment file if it doesn't exist
if not exist .env.local (
    echo [INFO] Creating frontend environment file...
    copy env.local.example .env.local
    echo [SUCCESS] Created .env.local - please update with your settings
) else (
    echo [SUCCESS] Frontend environment file already exists
)

cd ..

REM Setup backend
echo [INFO] Setting up backend...
cd backend-prisma

echo [INFO] Installing backend dependencies...
call npm install

REM Create environment file if it doesn't exist
if not exist .env (
    echo [INFO] Creating backend environment file...
    copy env.example .env
    echo [WARNING] Created .env - please update DATABASE_URL with your PostgreSQL connection
) else (
    echo [SUCCESS] Backend environment file already exists
)

REM Generate Prisma client
echo [INFO] Generating Prisma client...
call npm run db:generate

cd ..

REM Setup database if PostgreSQL is installed
if %POSTGRES_INSTALLED%==1 (
    echo.
    set /p SETUP_DB="Do you want to setup the database now? (y/n): "
    if /i "%SETUP_DB%"=="y" (
        echo [INFO] Setting up database...
        cd backend-prisma
        
        echo [INFO] Pushing database schema...
        call npm run db:push
        
        echo [INFO] Seeding database...
        call npm run db:seed
        
        cd ..
        echo [SUCCESS] Database setup complete
    ) else (
        echo [WARNING] Skipping database setup. You can run it later with: cd backend-prisma ^&^& npm run db:push ^&^& npm run db:seed
    )
) else (
    echo [WARNING] Skipping database setup. Install PostgreSQL and run: cd backend-prisma ^&^& npm run db:push ^&^& npm run db:seed
)

echo.
echo [SUCCESS] Development environment setup complete!
echo.
echo Next steps:
echo 1. Update environment files with your settings:
echo    - frontend\.env.local
echo    - backend-prisma\.env
echo.
echo 2. Start the development servers:
echo    Frontend: cd frontend ^&^& npm run dev
echo    Backend:  cd backend-prisma ^&^& npm run dev
echo.
echo 3. Open your browser:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000/health
echo.
echo Happy coding! 🎉
pause
