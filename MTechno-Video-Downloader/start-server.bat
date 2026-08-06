@echo off
title Video Downloader by MTechno
color 0B
mode con: cols=55 lines=25

echo.
echo   ========================================
echo     Video Downloader by MTechno
echo     Auto-Setup ^& Server Launcher
echo   ========================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo   [!] Python not found. Installing...
    winget install Python.Python.3.12 --accept-package-agreements --accept-source-agreements >nul 2>&1
    if errorlevel 1 (
        echo   [X] Auto-install failed. Install Python manually:
        echo       https://www.python.org/downloads/
        echo       IMPORTANT: Check "Add Python to PATH"
        pause
        exit /b 1
    )
    set "PATH=%LOCALAPPDATA%\Programs\Python\Python312;%LOCALAPPDATA%\Programs\Python\Python312\Scripts;%PATH%"
    python --version >nul 2>&1
    if errorlevel 1 (
        echo   [!] Python installed. CLOSE this window and
        echo       run start-server.bat AGAIN.
        pause
        exit /b 1
    )
    echo   [OK] Python installed!
) else (
    echo   [OK] Python found
)

pip show yt-dlp >nul 2>&1
if errorlevel 1 (
    echo   [*] Installing video engine...
    pip install yt-dlp aiohttp aiohttp-cors --quiet
    echo   [OK] Packages installed
) else (
    echo   [OK] Packages ready
)

where ffmpeg >nul 2>&1
if errorlevel 1 (
    echo   [*] Installing FFmpeg...
    winget install Gyan.FFmpeg --accept-package-agreements --accept-source-agreements >nul 2>&1
    if errorlevel 1 (
        echo   [~] FFmpeg skipped. Videos still work in fallback mode.
    ) else (
        echo   [OK] FFmpeg installed!
    )
) else (
    echo   [OK] FFmpeg found
)

echo.
echo   ========================================
echo     Server starting...
echo     Keep this window OPEN while downloading.
echo     Server auto-closes after 5 min idle.
echo   ========================================
echo.
cd /d "%~dp0server"
python server.py
pause
