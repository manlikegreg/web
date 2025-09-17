@echo off
echo Starting Science 1B Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if backend dependencies are installed
if not exist "backend-prisma\node_modules\" (
    echo Installing backend dependencies...
    cd backend-prisma
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
    cd ..
)

echo Starting backend server...
cd backend-prisma
call npm run dev

echo.
echo Backend server stopped.
pause
