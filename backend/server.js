const http = require('http');
const { Server } = require('socket.io');
const app = require('./index');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('🟢 Client connected');

  socket.on('joinGroupRoom', (groupId) => {
    socket.join(groupId);
    console.log(`User joined room: ${groupId}`);
  });

  socket.on('newMemberJoined', ({ groupId, member }) => {
    io.to(groupId).emit('groupUpdated', { member });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});