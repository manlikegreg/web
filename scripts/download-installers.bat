@echo off
echo ========================================
echo Science 1B Website - Download Installers
echo ========================================
echo.

echo This script will download all required installers for the Science 1B website.
echo.

REM Create downloads directory
if not exist "downloads" mkdir downloads

echo.
echo ========================================
echo Downloading Node.js
echo ========================================
echo.

echo Downloading Node.js LTS installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'downloads\nodejs-installer.msi'}"
if %errorLevel% equ 0 (
    echo Node.js installer downloaded successfully!
    echo File: downloads\nodejs-installer.msi
) else (
    echo Failed to download Node.js installer.
    echo Please download manually from: https://nodejs.org/
)

echo.
echo ========================================
echo Downloading PostgreSQL
echo ========================================
echo.

echo Downloading PostgreSQL installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://get.enterprisedb.com/postgresql/postgresql-15.4-1-windows-x64.exe' -OutFile 'downloads\postgresql-installer.exe'}"
if %errorLevel% equ 0 (
    echo PostgreSQL installer downloaded successfully!
    echo File: downloads\postgresql-installer.exe
) else (
    echo Failed to download PostgreSQL installer.
    echo Please download manually from: https://www.postgresql.org/download/windows/
)

echo.
echo ========================================
echo Downloading Git
echo ========================================
echo.

echo Downloading Git installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.3/Git-2.41.0.3-64-bit.exe' -OutFile 'downloads\git-installer.exe'}"
if %errorLevel% equ 0 (
    echo Git installer downloaded successfully!
    echo File: downloads\git-installer.exe
) else (
    echo Failed to download Git installer.
    echo Please download manually from: https://git-scm.com/download/win
)

echo.
echo ========================================
echo Downloading Visual Studio Code
echo ========================================
echo.

echo Downloading VS Code installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user' -OutFile 'downloads\vscode-installer.exe'}"
if %errorLevel% equ 0 (
    echo VS Code installer downloaded successfully!
    echo File: downloads\vscode-installer.exe
) else (
    echo Failed to download VS Code installer.
    echo Please download manually from: https://code.visualstudio.com/
)

echo.
echo ========================================
echo Download Complete!
echo ========================================
echo.
echo All installers have been downloaded to the 'downloads' folder.
echo.
echo Installation order:
echo 1. Node.js (nodejs-installer.msi)
echo 2. PostgreSQL (postgresql-installer.exe)
echo 3. Git (git-installer.exe)
echo 4. VS Code (vscode-installer.exe)
echo.
echo After installing all dependencies, run:
echo scripts\install-dependencies.bat
echo.
echo Or run the installers manually:
echo - Double-click each .msi/.exe file in the downloads folder
echo - Follow the installation wizards
echo - Restart your computer after installation
echo.
pause


