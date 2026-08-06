<div align="center">

# ⚡ VIDEO DOWNLOADER EXTENSION
### *v1.2*

[![Powered by yt-dlp](https://img.shields.io/badge/Powered_by-yt--dlp-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white)](https://github.com/yt-dlp/yt-dlp)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981.svg?style=for-the-badge)]()
[![Platform: Chromium](https://img.shields.io/badge/Browser-Chromium_Based-4285F4.svg?style=for-the-badge&logo=google-chrome&logoColor=white)]()

A robust, lightning-fast, and lightweight browser extension engineered for seamless media extraction across the web.

</div>

---

## 📥 Installation & Download

To download the `.zip` file, visit our official release page:
**👉 [https://methehan.github.io/video-downloader-extension/](https://methehan.github.io/video-downloader-extension/)**

---

## ✨ Enterprise-Grade Features

*   **Universal Compatibility:** Extract media seamlessly from over **1,000+ platforms**, including YouTube, X (Twitter), TikTok, Instagram, Twitch, and Vimeo.
*   **Zero-Touch Configuration:** Our intelligent bootstrap script handles the entire backend environment setup. No manual dependency hunting.
*   **One-Click Server Launch (v1.2):** Hit the **"Copy & Run Server"** button inside the extension. It instantly copies `start-server.bat` to your clipboard — just press `Win` → `Ctrl+V` → `Enter` to boot the engine. No path hunting required.
*   **Smart Resource Allocation:** The backend server features an auto-termination protocol. It automatically shuts down after 5 minutes of idle time, guaranteeing **zero permanent RAM usage**.
*   **Auto URL Detection:** The extension intelligently captures the active tab's URL the moment you open the popup.
*   **Quality Control:** Choose between Best Quality, 1080p, 720p, or Audio Only (MP3) extraction.
*   **Non-Destructive Uninstallation:** A dedicated teardown script ensures all background dependencies are cleanly wiped without affecting your downloaded media files.

---

## 📦 System Architecture & Contents

When you extract the package, you will find a structured directory designed for modularity:

```text
📁 MTechno-Video-Downloader/
├── 📁 extension/       # Core browser extension files (Load this in Chromium)
│   ├── manifest.json   # Extension identity & permissions
│   ├── popup.html      # User interface
│   ├── popup.css       # Smooth dark theme styling
│   ├── popup.js        # Frontend logic & API bridge
│   └── icon*.png       # Application icons (16/48/128px)
├── 📁 server/          # Backend extraction engine powered by yt-dlp
│   ├── server.py       # aiohttp server with 5-min idle timeout
│   └── requirements.txt
├── 📄 logo.png         # Source application icon
├── 📜 start-server.bat # Automated initialization & boot script
├──  uninstall.bat    # Clean removal utility
└── 📄 README.md        # Documentation
```

---

## 🚀 Quick Start Guide (One-Time Setup)

Getting the system up and running takes less than a minute.

### Step 1: Deploy the Extension
1. Launch your Chromium-based browser (Brave, Chrome, Edge, etc.).
2. Navigate to your extensions dashboard (`brave://extensions/` or `chrome://extensions/`).
3. Toggle **Developer mode** ON (usually located in the top right corner).
4. Click **Load unpacked** and select the `extension/` folder from this repository.
5. **Done.** The extension icon is now active in your toolbar.

### Step 2: Initialize the Engine
1. Click the extension icon in your toolbar.
2. You will see the **"Server not running"** screen.
3. Click the green **"Copy & Run Server"** button.
4. A confirmation appears: `start-server.bat copied!`
5. Press **`Win`** → **`Ctrl+V`** → **`Enter`**.
6. A terminal window opens. This acts as a smart bootstrap utility.

> **First Run Only (~130 MB):** The script dynamically checks your system and automatically installs Python (~25MB), `yt-dlp` (~15MB), networking libraries (`aiohttp`, `aiohttp-cors`), and FFmpeg for advanced media multiplexing (~80MB).
> *Subsequent launches bypass this process and boot in under **2 seconds**.*

7. Wait until you see `Server starting...` in the terminal.
8. Return to the extension — the status pill turns **Online** ✅.

### Step 3: Extract Media
1. Navigate to any supported video page.
2. Click the extension icon — the URL is auto-detected.
3. Select your preferred quality.
4. Click **Download** and watch the real-time progress bar.

---

## 🧹 Clean Teardown

If you need to remove the backend environment:
1. Execute `uninstall.bat`.
2. The script will safely purge the downloaded Python packages, FFmpeg binaries, and temporary programmatic files.

*Rest assured: Your personal downloaded videos remain entirely untouched and safe.*

---

## 📋 Changelog

### v1.2
*   **One-Click Server Launch:** Hit **"Copy & Run Server"** inside the extension — it copies `start-server.bat` to your clipboard instantly. Just press `Win` → `Ctrl+V` → `Enter` to boot.
*   **Streamlined UX:** Removed redundant folder path input. No more manual path hunting.
*   **Auto URL Detection:** The extension now intelligently captures the active tab's URL the moment you open the popup.
*   **Quality Control:** Choose between Best Quality, 1080p, 720p, or Audio Only (MP3) extraction.
*   **Smart Resource Allocation:** Backend auto-terminates after 5 minutes of idle time — zero permanent RAM usage.
*   **Clean Teardown:** Dedicated `uninstall.bat` safely purges all dependencies without touching your downloaded media.

### v1.0
*   Initial release with yt-dlp integration.
*   Smooth dark UI with gradient animations.
*   Real-time download progress tracking.
*   One-click setup & clean uninstall scripts.

---

## ❓ FAQ

**Q: Why does the extension say "Server not running" every time?**
A: The server auto-terminates after 5 minutes of inactivity to save RAM. Simply click "Copy & Run Server" again — it boots in ~2 seconds since all dependencies are already installed.

**Q: Why can't the extension start the server automatically?**
A: Browser security policies strictly prevent extensions from executing local system commands. The clipboard-assisted launch (`Win` → `Ctrl+V` → `Enter`) is the most secure and universal workaround.

**Q: Download quality seems lower than expected.**
A: Ensure FFmpeg is installed for advanced media multiplexing. If the auto-install skipped it, run `winget install ffmpeg` in your terminal.

**Q: Is my data safe?**
A: Absolutely. All processing happens locally on `localhost:8765`. Zero data is transmitted to external servers.

---

<div align="center">

**Made by MTechno**  
🌐 [YouTube: @MTechnoW](https://youtube.com/@MTechnoW)

</div>
