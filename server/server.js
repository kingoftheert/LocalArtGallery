const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const IMAGE_DIR = path.join(__dirname, '../Picture');


app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Serve image files
app.get('/images', (req, res) => {
  fs.readdir(IMAGE_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read image directory' });
    }
    // Filter for common image types
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file));
    // Sort by file modified time, newest first
    const sortedFiles = imageFiles
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(IMAGE_DIR, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time)
      .map(f => f.name);
    res.json(sortedFiles);
  });
});

app.get('/image/:name', (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(IMAGE_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Image not found');
  }
  res.sendFile(filePath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Art Gallery server running at http://0.0.0.0:${PORT} or http://localhost:${PORT} if not working`);
});
