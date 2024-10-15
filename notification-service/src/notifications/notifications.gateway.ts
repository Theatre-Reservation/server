import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(notification: any) {
    this.server.emit('notification', notification);
  }
}
