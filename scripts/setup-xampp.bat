@echo off
echo Setting up Science 1B website for XAMPP preview...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if XAMPP is installed
if not exist "C:\xampp\htdocs\" (
    echo ERROR: XAMPP is not installed or not found at C:\xampp\
    echo Please install XAMPP from https://www.apachefriends.org/
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo Building frontend for static export...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)

call npm run export
if %errorlevel% neq 0 (
    echo ERROR: Failed to export static files
    pause
    exit /b 1
)

echo Copying files to XAMPP...
if exist "C:\xampp\htdocs\science-1b\" (
    echo Removing existing science-1b directory...
    rmdir /s /q "C:\xampp\htdocs\science-1b\"
)

echo Creating science-1b directory in XAMPP...
mkdir "C:\xampp\htdocs\science-1b\"

echo Copying built files...
xcopy "out\*" "C:\xampp\htdocs\science-1b\" /E /I /Y
if %errorlevel% neq 0 (
    echo ERROR: Failed to copy files to XAMPP
    pause
    exit /b 1
)

cd ..

echo Installing backend dependencies...
cd backend-prisma
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo XAMPP Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start XAMPP Control Panel
echo 2. Start Apache service
echo 3. Run: start-backend.bat (in another terminal)
echo 4. Open: http://localhost/science-1b/
echo.
echo Backend API will be available at: http://localhost:3001
echo.
pause
