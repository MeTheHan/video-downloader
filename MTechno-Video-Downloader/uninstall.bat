@echo off
title Uninstall Video Downloader
color 0C
echo.
echo   ========================================
echo     Uninstalling Video Downloader
echo     by MTechno
echo   ========================================
echo.
echo   Removing pip packages...
pip uninstall yt-dlp aiohttp aiohttp-cors -y >nul 2>&1
echo   [OK] Packages removed
echo.
echo   Removing FFmpeg...
winget uninstall Gyan.FFmpeg >nul 2>&1
echo   [OK] FFmpeg removed
echo.
echo   Removing program files...
cd /d "%TEMP%"
rd /s /q "%USERPROFILE%\Desktop\MTechno-Video-Downloader" >nul 2>&1
echo   [OK] Program files removed
echo.
echo   ========================================
echo     Uninstall complete!
echo     Downloaded videos were NOT deleted.
echo   ========================================
echo.
pause
