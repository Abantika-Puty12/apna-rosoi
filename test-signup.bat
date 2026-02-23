@echo off
REM Signup Testing Script

echo.
echo ============================================
echo   Apna Rosoi - Signup Diagnostics
echo ============================================
echo.

REM Test Backend Connection
echo Testing Backend Connection...
curl -s http://localhost:5000 >nul
if %errorlevel% equ 0 (
    echo [OK] Backend is responding on http://localhost:5000
) else (
    echo [ERROR] Backend is NOT responding
    echo [FIX] Start backend: cd backend ^&^& npm run dev
    pause
    exit /b 1
)

REM Test MongoDB Connection
echo Testing MongoDB Connection...
call mongosh -e "db.version()" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB is responding on localhost:27017
) else (
    echo [ERROR] MongoDB is NOT responding
    echo [FIX] Start MongoDB: Start-Service MongoDB
    pause
    exit /b 1
)

REM Test Frontend Connection
echo Testing Frontend Connection...
curl -s http://localhost:3000 >nul
if %errorlevel% equ 0 (
    echo [OK] Frontend is responding on http://localhost:3000
) else (
    echo [WARNING] Frontend might not be running
)

echo.
echo ============================================
echo   Services Status
echo ============================================
echo.

REM Check services
tasklist | findstr /I "node mongod" | find /v "findstr"
echo.

REM Show next steps
echo ============================================
echo   Next Steps to Debug Signup Error
echo ============================================
echo.
echo 1. Open Browser Developer Tools (F12)
echo.
echo 2. Go to NETWORK tab
echo.
echo 3. Click REGISTER button
echo.
echo 4. Fill in form and click SIGN UP
echo.
echo 5. Find POST request to: /api/auth/register
echo.
echo 6. Click on it and check RESPONSE tab
echo.
echo 7. Copy the error message
echo.
echo Example errors:
echo   - "Email already exists" - Use different email
echo   - "ValidationError" - Check form data
echo   - "MongoDB connection error" - Restart backend
echo   - "Server error" - Check backend terminal
echo.

pause
