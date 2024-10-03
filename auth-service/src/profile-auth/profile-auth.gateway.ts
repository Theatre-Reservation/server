import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8500, {
  cors: {
    origin: 'http://localhost:3000',  // React frontend origin
    credentials: true,  // Allow cookies and credentials
  },
})
export class ProfileAuthGateway {
  @WebSocketServer()
  server: Server;

  // Listen to the profile update event
  @SubscribeMessage('profileUpdated')
  handleProfileUpdate(@MessageBody() data: { name: string }) {
    console.log('Profile update received for:', data.name);
    this.server.emit('profileUpdated', data);
  }

  // Emit notifications to the client
  sendNotification(message: string) {
    this.server.emit('notification', { message });
  }
}
