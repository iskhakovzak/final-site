const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from deploy directory
app.use(express.static(path.join(__dirname, 'deploy')));

// Handle all routes by serving the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'deploy', 'seconss.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sarvinoz Portfolio Server запущен на порту ${PORT}`);
    console.log(`📱 Откройте в браузере: http://localhost:${PORT}`);
    console.log(`✨ Веб-сайт готов к просмотру!`);
});