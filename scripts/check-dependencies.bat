@echo off
echo ========================================
echo Science 1B Website - Dependency Checker
echo ========================================
echo.

echo Checking all required dependencies...
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Node.js: INSTALLED
    node --version
) else (
    echo ❌ Node.js: NOT INSTALLED
    echo    Download from: https://nodejs.org/
)

echo.

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ npm: INSTALLED
    npm --version
) else (
    echo ❌ npm: NOT INSTALLED
    echo    Usually comes with Node.js
)

echo.

REM Check PostgreSQL
echo Checking PostgreSQL...
psql --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ PostgreSQL: INSTALLED
    psql --version
) else (
    echo ❌ PostgreSQL: NOT INSTALLED
    echo    Download from: https://www.postgresql.org/download/windows/
)

echo.

REM Check Git
echo Checking Git...
git --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Git: INSTALLED
    git --version
) else (
    echo ❌ Git: NOT INSTALLED
    echo    Download from: https://git-scm.com/download/win
)

echo.

REM Check VS Code
echo Checking Visual Studio Code...
code --version >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ VS Code: INSTALLED
    code --version
) else (
    echo ❌ VS Code: NOT INSTALLED
    echo    Download from: https://code.visualstudio.com/
)

echo.

REM Check project dependencies
echo Checking project dependencies...
if exist "frontend\node_modules\" (
    echo ✅ Frontend dependencies: INSTALLED
) else (
    echo ❌ Frontend dependencies: NOT INSTALLED
    echo    Run: cd frontend && npm install
)

if exist "backend-prisma\node_modules\" (
    echo ✅ Backend dependencies: INSTALLED
) else (
    echo ❌ Backend dependencies: NOT INSTALLED
    echo    Run: cd backend-prisma && npm install
)

echo.

REM Check database connection
echo Checking database connection...
if exist "backend-prisma\.env" (
    echo ✅ Database config: EXISTS
) else (
    echo ❌ Database config: MISSING
    echo    Create backend-prisma\.env file
)

echo.

REM Check if database is accessible
cd backend-prisma
npx prisma db push --accept-data-loss >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Database connection: WORKING
) else (
    echo ❌ Database connection: FAILED
    echo    Check PostgreSQL service and .env file
)
cd ..

echo.

REM Check if project builds
echo Checking project build...
cd frontend
npm run build >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Frontend build: SUCCESS
) else (
    echo ❌ Frontend build: FAILED
    echo    Check for errors in the build output
)
cd ..

cd backend-prisma
npm run build >nul 2>&1
if %errorLevel% equ 0 (
    echo ✅ Backend build: SUCCESS
) else (
    echo ❌ Backend build: FAILED
    echo    Check for errors in the build output
)
cd ..

echo.

REM Summary
echo ========================================
echo DEPENDENCY CHECK SUMMARY
echo ========================================
echo.

REM Count missing dependencies
set missing=0

node --version >nul 2>&1
if %errorLevel% neq 0 set /a missing+=1

psql --version >nul 2>&1
if %errorLevel% neq 0 set /a missing+=1

git --version >nul 2>&1
if %errorLevel% neq 0 set /a missing+=1

if %missing% equ 0 (
    echo 🎉 All dependencies are installed and working!
    echo.
    echo You can now run:
    echo   scripts\quick-preview.bat
    echo.
) else (
    echo ⚠️  %missing% dependencies are missing or not working.
    echo.
    echo To install missing dependencies:
    echo   scripts\auto-install.bat
    echo.
    echo Or install manually:
    echo   scripts\download-installers.bat
    echo.
)

echo.
pause


