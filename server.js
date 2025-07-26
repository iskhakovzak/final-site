const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from deploy directory
app.use(express.static(path.join(__dirname, 'deploy')));

// Handle all routes by serving the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'deploy', 'seconss.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'deploy', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sarvinoz Portfolio Server запущен на порту ${PORT}`);
    console.log(`📱 Откройте в браузере: http://localhost:${PORT}`);
    console.log(`✨ Веб-сайт готов к просмотру!`);
    console.log(`📁 Статические файлы из: ${path.join(__dirname, 'deploy')}`);
});

// Error handling
app.on('error', (err) => {
    console.error('Ошибка сервера:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Критическая ошибка:', err);
});