<div align="center">

# ⚡ VIDEO DOWNLOADER 
### *Final Edition*

[![Powered by yt-dlp](https://img.shields.io/badge/Powered_by-yt--dlp-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white)](https://github.com/yt-dlp/yt-dlp)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981.svg?style=for-the-badge)]()
[![Platform: Chromium](https://img.shields.io/badge/Browser-Chromium_Based-4285F4.svg?style=for-the-badge&logo=google-chrome&logoColor=white)]()

A robust, lightning-fast, and lightweight browser extension engineered for seamless media extraction across the web.

</div>

---

## 📥 Installation & Download

To download the `.zip` file, visit our official release page:
**👉 [https://methehan.github.io/video-downloader/](https://methehan.github.io/video-downloader/)**

---

## ✨ Enterprise-Grade Features

*   **Universal Compatibility:** Extract media seamlessly from over **1,000+ platforms**, including YouTube, X (Twitter), TikTok, Instagram, Twitch, and Vimeo.
*   **Zero-Touch Configuration:** Our intelligent bootstrap script handles the entire backend environment setup. No manual dependency hunting.
*   **Smart Resource Allocation:** The backend server features an auto-termination protocol. It automatically shuts down after 5 minutes of idle time, guaranteeing **zero permanent RAM usage**.
*   **Non-Destructive Uninstallation:** A dedicated teardown script ensures all background dependencies are cleanly wiped without affecting your downloaded media files.

---

## 📦 System Architecture & Contents

When you extract the package, you will find a structured directory designed for modularity:

```text
📁 Video-Downloader-Final/
├── 📁 extension/       # Core browser extension files (Load this in Chromium)
├── 📁 server/          # Backend extraction engine powered by yt-dlp
├── 📄 logo.png         # Source application icon
├── 📜 start-server.bat # Automated initialization & boot script
├── 📜 uninstall.bat    # Clean removal utility
└── 📄 README.txt       # Documentation
```

---

## 🚀 Quick Start Guide (One-Time Setup)

Getting the system up and running takes less than a minute. 

### Step 1: Initialize the Engine
Double-click `start-server.bat`. This acts as a smart bootstrap utility. 

> **First Run Only (~130 MB):** The script dynamically checks your system and automatically installs Python (~25MB), `yt-dlp` (~15MB), networking libraries (`aiohttp`, `aiohttp-cors`), and FFmpeg for advanced media multiplexing (~80MB). 
> *Subsequent launches bypass this process and boot in under **2 seconds**.*

### Step 2: Deploy the Extension
1. Launch your Chromium-based browser (Brave, Chrome, Edge, etc.).
2. Navigate to your extensions dashboard (`brave://extensions/` or `chrome://extensions/`).
3. Toggle **Developer mode** ON (usually located in the top right corner).
4. Click **Load unpacked** and select the `extension/` folder from this repository.
5. **Done.** The extension is now active and bridging with your local server (`localhost:8765`).

---

## 🧹 Clean Teardown

If you need to remove the backend environment:
1. Execute `uninstall.bat`.
2. The script will safely purge the downloaded Python packages, FFmpeg binaries, and temporary programmatic files.

*Rest assured: Your personal downloaded videos remain entirely untouched and safe.*

---

<div align="center">

**Made by MTechno**  
🌐 [YouTube: @MTechnoW](https://youtube.com/@MTechnoW)

</div>
