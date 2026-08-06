VIDEO DOWNLOADER by MTechno — FINAL EDITION
=============================================
YouTube: https://youtube.com/@MTechnoW


WHAT IS THIS?
-------------
A video downloader browser extension powered by yt-dlp.
Supports YouTube, Twitter/X, TikTok, Instagram, Twitch,
Vimeo, and 1000+ other sites.


PACKAGE CONTENTS
-----------------
  extension/       -> Load this folder in Brave/Chrome
  server/          -> Download engine (yt-dlp)
  logo.png         -> App logo (source image)
  start-server.bat -> Auto-installs everything + starts server
  uninstall.bat    -> Removes everything permanently
  README.txt       -> This file


WHAT DOES start-server.bat DO?
------------------------------
Step 1: Checks Python. If missing, installs it (~25 MB).
Step 2: Installs packages:
        - yt-dlp        ~15 MB
        - aiohttp       ~10 MB
        - aiohttp-cors   ~1 MB
Step 3: Checks FFmpeg. If missing, installs it (~80 MB).
Step 4: Starts the server on localhost:8765.

Total first-time download: approx 130 MB.
After that, it launches in ~2 seconds.


AUTO SHUTDOWN
--------------
The server shuts itself down after 5 minutes of
inactivity. No permanent RAM usage.


SETUP (ONE TIME)
-----------------
1. Double-click start-server.bat
2. Brave -> brave://extensions/
   Enable "Developer mode"
   Click "Load unpacked"
   Select the "extension" folder
3. Done!


UNINSTALL
----------
Double-click uninstall.bat
Removes packages, FFmpeg, and program files.
Your downloaded videos are NOT deleted.


Made with love by MTechno
https://youtube.com/@MTechnoW
