const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require('path');

const {Server} = require('socket.io');

app.use(express.static(path.join(__dirname, 'public')));

const io = new Server(server);

io.on('connection', (socket) => {
   socket.on('user-message', (message) => {
      socket.broadcast.emit('message', message);
   })
});

app.get("/chat", (req,res) => {
   return res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});