@echo off
echo ============================================
echo  Student Course Management System
echo ============================================
echo.
echo Navigating to frontend directory...
cd frontend
echo.
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting JSON Server and React App...
echo.
echo JSON Server: http://localhost:8080
echo React App:   http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo ============================================
echo.

call npm run start:all

