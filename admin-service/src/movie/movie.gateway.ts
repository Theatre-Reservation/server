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

    // Function to emit new show discount notifications
    notifyShowDiscount(show: any) {
      console.log('Show discount added:', show);
      this.server.emit('newShowDiscount', show); // Broadcast to all connected clients
    }

    // Function to emit new event discount notifications
    notifyEventDiscount(event: any) {
      console.log('Event discount added:', event);
      this.server.emit('newEventDiscount', event); // Broadcast to all connected clients
    }
  }
  