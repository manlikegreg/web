@echo off
REM Science 1B Website - Development Startup Script (Windows)
REM This script starts both frontend and backend development servers

echo 🚀 Starting Science 1B Website Development Servers
echo ================================================

REM Function to check if a port is in use
:check_port
set port=%1
netstat -an | find ":%port% " | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo [WARNING] Port %port% is already in use. Killing existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| find ":%port% " ^| find "LISTENING"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

REM Check and kill processes on ports 3000 and 5000
call :check_port 3000
call :check_port 5000

REM Start backend
echo [INFO] Starting backend server...
cd backend-prisma

REM Check if .env exists
if not exist .env (
    echo [ERROR] Backend environment file not found. Please run setup first.
    pause
    exit /b 1
)

REM Start backend in background
start "Backend Server" cmd /k "npm run dev"
cd ..

REM Wait for backend to start
echo [INFO] Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Check if backend is running
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Backend server started successfully on http://localhost:5000
) else (
    echo [ERROR] Backend server failed to start
    pause
    exit /b 1
)

REM Start frontend
echo [INFO] Starting frontend server...
cd frontend

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] Frontend environment file not found. Creating from example...
    copy env.local.example .env.local
)

REM Start frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

REM Wait for frontend to start
echo [INFO] Waiting for frontend to start...
timeout /t 10 /nobreak >nul

REM Check if frontend is running
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Frontend server started successfully on http://localhost:3000
) else (
    echo [ERROR] Frontend server failed to start
    pause
    exit /b 1
)

echo.
echo [SUCCESS] 🎉 Development servers are running!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo API Health: http://localhost:5000/health
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill all Node.js processes
taskkill /IM node.exe /F >nul 2>&1
echo [INFO] Servers stopped
pause
