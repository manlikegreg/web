@echo off
echo ========================================
echo Science 1B Website - Quick Start
echo ========================================
echo.

echo Starting the Science 1B website...
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Choose your preview method:
echo 1. Frontend Only (No database needed)
echo 2. Full Website (Requires database)
echo 3. XAMPP Preview (Static files)
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto frontend
if "%choice%"=="2" goto full
if "%choice%"=="3" goto xampp
echo Invalid choice. Please try again.
goto end

:frontend
echo.
echo Starting frontend only...
echo Frontend will be available at: http://localhost:3000
echo.
echo Note: Some features may not work without the backend
echo.
cd frontend
call npm run dev
goto end

:full
echo.
echo Starting full website...
echo.

REM Check if backend dependencies are installed
if not exist "backend-prisma\node_modules\" (
    echo Installing backend dependencies...
    cd backend-prisma
    call npm install
    cd ..
)

REM Start backend
echo Starting backend server...
start "Science 1B Backend" cmd /k "cd backend-prisma && npm run dev"

REM Wait a moment
timeout /t 3 /nobreak >nul

REM Start frontend
echo Starting frontend server...
cd frontend
call npm run dev

echo.
echo Full website started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo.
goto end

:xampp
echo.
echo Setting up XAMPP preview...
echo.

REM Check if XAMPP is running
netstat -an | find "80" | find "LISTENING" >nul
if %errorLevel% neq 0 (
    echo WARNING: Apache (port 80) is not running.
    echo Please start XAMPP Control Panel and start Apache.
    echo.
)

REM Build for XAMPP
echo Building frontend for XAMPP...
cd frontend
call npm run build
if %errorLevel% neq 0 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)

REM Copy to XAMPP
echo Copying files to XAMPP...
if exist "C:\xampp\htdocs\science-1b\" (
    rmdir /s /q "C:\xampp\htdocs\science-1b\"
)
mkdir "C:\xampp\htdocs\science-1b\"
xcopy "out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y

cd ..

REM Start backend
echo Starting backend server...
start "Science 1B Backend" cmd /k "cd backend-prisma && npm run dev"

echo.
echo XAMPP preview ready!
echo Frontend: http://localhost/science-1b/
echo Backend: http://localhost:3001
echo.
goto end

:end
pause









