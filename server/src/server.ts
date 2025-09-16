import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import connectDB from './database/db';

type User = {
  id: string;
  name: string;
  role: 'student' | 'psychologist';
  socketId: string;
};

type ChatRoom = {
  id: string;
  student: User;
  psychologist: User;
  messages: Array<{
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    timestamp: Date;
  }>;
};

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const PORT = 4000;

  // Connect to MongoDB
  await connectDB();

  // Create Socket.IO server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'http://localhost:3000', // Your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  // In-memory storage for demo (use database in production)
  const activeUsers = new Map<string, User>();
  const chatRooms = new Map<string, ChatRoom>();

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    // console.log('User connected:', socket.id);

    // User joins with their info
    socket.on(
      'join',
      ({
        userId,
        name,
        role,
      }: {
        userId: string;
        name: string;
        role: 'student' | 'psychologist';
      }) => {
        const user: User = { id: userId, name, role, socketId: socket.id };
        activeUsers.set(socket.id, user);

        // console.log(`${role} ${name} joined with socket ${socket.id}`);

        // If student, try to match with available psychologist
        if (role === 'student') {
          const availablePsychologist = Array.from(activeUsers.values()).find(
            (u) => u.role === 'psychologist',
          );
          if (availablePsychologist) {
            createChatRoom(user, availablePsychologist);
          }
        }
      },
    );

    // Handle joining a specific chat room
    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
      const room = chatRooms.get(roomId);
      if (room) {
        socket.emit('roomJoined', { roomId, messages: room.messages });
      }
    });

    // Handle sending messages
    socket.on('sendMessage', ({ roomId, message }: { roomId: string; message: string }) => {
      const room = chatRooms.get(roomId);
      const user = activeUsers.get(socket.id);

      if (room && user) {
        const newMessage = {
          id: Date.now().toString(),
          senderId: user.id,
          senderName: user.name,
          message,
          timestamp: new Date(),
        };

        room.messages.push(newMessage);
        io.to(roomId).emit('newMessage', newMessage);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      // console.log('User disconnected:', socket.id);
      activeUsers.delete(socket.id);

      // Remove user from any chat rooms
      for (const [roomId, room] of chatRooms.entries()) {
        if (room.student.socketId === socket.id || room.psychologist.socketId === socket.id) {
          io.to(roomId).emit('userLeft', 'The other user has left the chat');
          chatRooms.delete(roomId);
        }
      }
    });

    function createChatRoom(student: User, psychologist: User) {
      const roomId = `room_${student.id}_${psychologist.id}_${Date.now()}`;
      const room: ChatRoom = {
        id: roomId,
        student,
        psychologist,
        messages: [],
      };

      chatRooms.set(roomId, room);

      // Notify both users about the room
      io.to(student.socketId).emit('roomCreated', { roomId, otherUser: psychologist });
      io.to(psychologist.socketId).emit('roomCreated', { roomId, otherUser: student });

      console.log(`Chat room created: ${roomId}`);
    }
  });

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [],
  });

  await server.start();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      message: 'Backend is connected!',
      timestamp: new Date().toISOString(),
    });
  });

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server));

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 GraphQL: http://localhost:${PORT}/graphql`);
    console.log(`💬 Socket.IO: Ready for connections`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
