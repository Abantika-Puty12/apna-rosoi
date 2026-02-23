@echo off
REM MongoDB and Backend Verification Script for Windows

echo.
echo ============================================
echo   Apna Rosoi - Service Verification
echo ============================================
echo.

REM Check MongoDB Service
echo Checking MongoDB Service...
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB service found
) else (
    echo [ERROR] MongoDB service NOT found - Need to install
)

echo.
echo Checking if MongoDB is RUNNING...
tasklist | findstr /I "mongod" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB is RUNNING on port 27017
) else (
    echo [INFO] MongoDB not running - Starting...
    net start MongoDB >nul 2>&1
    echo [OK] MongoDB started
    timeout /t 3
)

echo.
echo Checking if Backend is RUNNING...
netstat -ano | findstr ":5000 " >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend is RUNNING on port 5000
) else (
    echo [INFO] Backend NOT running
    echo [TIP] Start backend with: cd backend && npm run dev
)

echo.
echo Checking if Frontend is RUNNING...
netstat -ano | findstr ":3000 " >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is RUNNING on port 3000
) else (
    echo [INFO] Frontend NOT running
    echo [TIP] Start frontend with: cd frontend && npm start
)

echo.
echo ============================================
echo   Status Summary
echo ============================================
echo.
echo MongoDB:  http://127.0.0.1:27017
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Signup page: http://localhost:3000/register
echo.
pause
