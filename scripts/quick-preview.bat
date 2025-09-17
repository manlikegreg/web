@echo off
echo Science 1B - Quick Preview Setup
echo ================================
echo.

echo Choose your preview option:
echo 1. Full Development Environment (Recommended)
echo 2. XAMPP Static Preview
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto xampp
if "%choice%"=="3" goto exit
echo Invalid choice. Please try again.
goto end

:dev
echo.
echo Starting Full Development Environment...
echo This will start both frontend and backend servers.
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo.
echo Press Ctrl+C in each terminal to stop the servers.
echo.

REM Start backend in new window
start "Science 1B Backend" cmd /k "cd backend-prisma && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Science 1B Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Development servers started!
echo Check the opened terminal windows for any errors.
echo.
goto end

:xampp
echo.
echo Setting up XAMPP Preview...
echo.

REM Check if XAMPP is running
netstat -an | find "80" | find "LISTENING" >nul
if %errorlevel% neq 0 (
    echo WARNING: Apache (port 80) is not running.
    echo Please start XAMPP Control Panel and start Apache.
    echo.
)

echo Building and deploying to XAMPP...
call setup-xampp.bat

echo.
echo Starting backend server...
start "Science 1B Backend" cmd /k "cd backend-prisma && npm run dev"

echo.
echo XAMPP Preview Setup Complete!
echo.
echo Frontend: http://localhost/science-1b/
echo Backend: http://localhost:3001
echo.
echo Make sure XAMPP Apache is running.
echo.
goto end

:exit
echo Goodbye!
goto end

:end
pause
