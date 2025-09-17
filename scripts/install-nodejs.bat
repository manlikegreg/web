@echo off
echo ========================================
echo Installing Node.js
echo ========================================
echo.

echo This script will download and install Node.js for you.
echo.

REM Check if Node.js is already installed
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo Node.js is already installed:
    node --version
    echo.
    echo You can proceed with the website setup.
    pause
    exit /b 0
)

echo Node.js not found. Installing...
echo.

REM Create downloads directory
if not exist "downloads" mkdir downloads

echo Downloading Node.js installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'downloads\nodejs-installer.msi'}"

if exist "downloads\nodejs-installer.msi" (
    echo Node.js installer downloaded successfully!
    echo.
    echo Installing Node.js...
    echo Please follow the installation wizard.
    echo.
    echo IMPORTANT: Make sure to check "Add to PATH" during installation!
    echo.
    start /wait "Node.js Installer" "downloads\nodejs-installer.msi"
    
    echo.
    echo Node.js installation completed!
    echo.
    echo IMPORTANT: Please restart your computer to update the PATH.
    echo After restarting, run: scripts\install-essential.bat
    echo.
) else (
    echo Failed to download Node.js installer.
    echo.
    echo Please download manually:
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version (green button)
    echo 3. Run the installer with default settings
    echo 4. Restart your computer
    echo.
)

pause









