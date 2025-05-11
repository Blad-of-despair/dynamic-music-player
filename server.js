const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, images, musics)
app.use(express.static(__dirname));

// API to get songs list dynamically from musics folder
const fs = require('fs');
app.get('/api/songs', (req, res) => {
  fs.readdir(path.join(__dirname, 'musics'), (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to read musics folder' });
    // Only return .mp3 files
    const songs = files.filter(f => f.endsWith('.mp3'));
    res.json(songs);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});