const express = require('express');
const http = require('http');
const cors = require('cors')
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const clients = {}; // Список клиентов и их соксетов
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors())

io.on('connection', (socket) => {
  console.log('Клиент подключился');

   // Обработка входящих сообщений
   socket.on('message', (message) => {
    console.log(`Получено сообщение: ${message}`);

    // Отправляем сообщение всем клиентам (кроме отправителя)
    socket.broadcast.emit('message', message);
  });

  // Обработка отключения клиента
  socket.on('disconnect', () => {
    console.log('Клиент отключился');
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
