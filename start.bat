@echo off
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed or not on your PATH.
  echo Install it from https://nodejs.org then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
  echo.
)

echo Starting the site at http://localhost:5173/
echo Keep this window open. Press Ctrl+C to stop.
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173/"
call npm run dev

pause
