# Local Art Gallery

A simple, mobile-friendly, Pinterest-style art gallery web app that runs locally on your PC. View, browse, and switch between images in your `Picture` folder from any device on your Wi-Fi network.

## Features
- Responsive masonry grid for images of any size
- Supports PNG, JPEG, GIF, WebP, BMP, and more
- Click/tap to view images in a modal
- Switch images with left/right arrow keys or by tapping sides on mobile
- Dark mode toggle with preference saved
- Easy to run: no database, no cloud, just Node.js

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)

### 2. Installation
1. Clone this repository or download the code.
2. Place your images in the `Picture` folder (or change the folder in `server/server.js`).
3. Open a terminal in the project directory and run:
   ```
   npm install
   ```

### 3. Running the Gallery
- Start the server:
  ```
  npm start
  ```
- Or double-click `start-gallery.bat` (Windows only)
- The gallery will open at [http://localhost:3000](http://localhost:3000)

### 4. Access from Other Devices
- Find your PC's local IP address (e.g., `192.168.1.10`)
- On your phone/tablet (same Wi-Fi), open a browser and go to:
  ```
  http://<your-pc-ip>:3000
  ```

## Customization
- To change the image folder, edit the `IMAGE_DIR` path in `server/server.js`.
- To add features (upload, tags, etc.), open an issue or PR!

## License
MIT
