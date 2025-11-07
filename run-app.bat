@echo off
echo Starting SCNBCP Application...
echo.

echo Installing dependencies...
call npm install

echo.
echo Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo Starting the application...
start cmd /k "npm run server"
timeout /t 3
start cmd /k "npm run client"

echo.
echo Application is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause