const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Настройка статических файлов из папки deploy
app.use(express.static(path.join(__dirname, 'deploy')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'deploy', 'index.html'));
});

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'deploy', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📱 Веб-сайт доступен по адресу: http://localhost:${PORT}`);
    console.log(`✅ Статус: РАБОТАЕТ`);
});

// Обработка ошибок
process.on('uncaughtException', (err) => {
    console.error('Ошибка сервера:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Необработанная ошибка:', err);
});