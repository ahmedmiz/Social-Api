import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/DB/dp";
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
import { app } from './src/index';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});
const connectedUsers = new Map<string, string>(); 

io.on('connection', (socket) => {
  socket.on('resgister', (userId) => {
    connectedUsers.set(userId, socket.id);
  });
  socket.on('disconnect', () => {
    connectedUsers.forEach((value, key) => {
      if (value === socket.id) {
        connectedUsers.delete(key);
      }
    });
  }
  );

    
});

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log( "Error on connecting the server to the database");
  });





export { io , connectedUsers }