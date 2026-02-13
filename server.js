const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir frontend
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO: conexiones
io.on("connection", (socket) => {
  console.log("✅ Cliente conectado:", socket.id);

  // Aviso a todos (excepto al nuevo) que alguien entró
  socket.broadcast.emit("system", `Un usuario se conectó (${socket.id.slice(0, 6)})`);

  // Escuchar mensaje del cliente y reenviar a TODOS
  socket.on("chat:message", (payload) => {
    // payload = { name, text, time }
    io.emit("chat:message", payload);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
    io.emit("system", `Un usuario salió (${socket.id.slice(0, 6)})`);
  });
});

// Heroku / Render / Railway usan PORT en variables de entorno
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
