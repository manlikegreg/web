@echo off
echo ========================================
echo Science 1B Website - One-Click Setup
echo ========================================
echo.

echo This script will automatically:
echo 1. Check your system
echo 2. Download required software
echo 3. Install dependencies
echo 4. Set up the project
echo 5. Start the website
echo.

echo WARNING: This will install software on your system.
echo Make sure you have administrator privileges.
echo.
pause

echo.
echo ========================================
echo Step 1: System Check
echo ========================================
echo.

call scripts\check-dependencies.bat

echo.
echo ========================================
echo Step 2: Download and Install
echo ========================================
echo.

echo Downloading installers...
call scripts\download-installers.bat

echo.
echo Installing software...
call scripts\auto-install.bat

echo.
echo ========================================
echo Step 3: Project Setup
echo ========================================
echo.

echo Setting up project...
call scripts\install-dependencies.bat

echo.
echo ========================================
echo Step 4: Final Check
echo ========================================
echo.

echo Verifying installation...
call scripts\check-dependencies.bat

echo.
echo ========================================
echo Step 5: Starting Website
echo ========================================
echo.

echo Starting the Science 1B website...
call scripts\quick-preview.bat

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your Science 1B website is now running!
echo.
echo URLs:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:3001
echo - XAMPP: http://localhost/science-1b/
echo.
echo To start the website again later, run:
echo   scripts\quick-preview.bat
echo.
echo To check dependencies, run:
echo   scripts\check-dependencies.bat
echo.
echo Enjoy your Science 1B website! 🎉
echo.
pause


