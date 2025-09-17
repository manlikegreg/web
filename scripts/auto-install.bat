@echo off
echo ========================================
echo Science 1B Website - Auto Installer
echo ========================================
echo.

echo This script will automatically install all dependencies and set up the project.
echo.
echo WARNING: This will install software on your system.
echo Make sure you have administrator privileges.
echo.
pause

echo.
echo ========================================
echo Step 1: Downloading Installers
echo ========================================
echo.

call scripts\download-installers.bat

echo.
echo ========================================
echo Step 2: Installing Software
echo ========================================
echo.

echo Installing Node.js...
if exist "downloads\nodejs-installer.msi" (
    echo Running Node.js installer...
    msiexec /i "downloads\nodejs-installer.msi" /quiet /norestart
    if %errorLevel% equ 0 (
        echo Node.js installed successfully!
    ) else (
        echo Failed to install Node.js. Please install manually.
    )
) else (
    echo Node.js installer not found. Please download manually.
)

echo.
echo Installing PostgreSQL...
if exist "downloads\postgresql-installer.exe" (
    echo Running PostgreSQL installer...
    echo NOTE: You will need to set a password for the postgres user.
    echo Please remember this password - you'll need it later!
    echo.
    "downloads\postgresql-installer.exe" --mode unattended --superpassword "science1b123" --servicename "postgresql" --serviceaccount "postgres" --servicepassword "science1b123"
    if %errorLevel% equ 0 (
        echo PostgreSQL installed successfully!
        echo Default password: science1b123
    ) else (
        echo Failed to install PostgreSQL. Please install manually.
    )
) else (
    echo PostgreSQL installer not found. Please download manually.
)

echo.
echo Installing Git...
if exist "downloads\git-installer.exe" (
    echo Running Git installer...
    "downloads\git-installer.exe" /SILENT
    if %errorLevel% equ 0 (
        echo Git installed successfully!
    ) else (
        echo Failed to install Git. Please install manually.
    )
) else (
    echo Git installer not found. Please download manually.
)

echo.
echo Installing Visual Studio Code...
if exist "downloads\vscode-installer.exe" (
    echo Running VS Code installer...
    "downloads\vscode-installer.exe" /SILENT
    if %errorLevel% equ 0 (
        echo VS Code installed successfully!
    ) else (
        echo Failed to install VS Code. Please install manually.
    )
) else (
    echo VS Code installer not found. Please download manually.
)

echo.
echo ========================================
echo Step 3: Setting Up Project
echo ========================================
echo.

echo Waiting for system to update PATH...
timeout /t 10 /nobreak >nul

echo Installing project dependencies...
call scripts\install-dependencies.bat

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo All dependencies have been installed and configured.
echo.
echo IMPORTANT: Please restart your computer to ensure all PATH changes take effect.
echo.
echo After restarting, run:
echo scripts\quick-preview.bat
echo.
echo Database credentials:
echo - Username: postgres
echo - Password: science1b123
echo - Database: science1b_db
echo.
echo If you want to change the database password, edit:
echo backend-prisma\.env
echo.
pause


