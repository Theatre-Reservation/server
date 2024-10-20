import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Allow all origins (adjust for security as needed)
    },
  })
  export class MovieGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection() {
      console.log('Client connected');
    }
  
    handleDisconnect() {
      console.log('Client disconnected');
    }
  
    // Function to emit new movie notifications
    notifyNewMovie(movie: any) {
      console.log('New movie added:', movie);
      this.server.emit('newMovie', movie); // Broadcast to all connected clients
    }
  }
  