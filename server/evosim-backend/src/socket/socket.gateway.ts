import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');

  constructor(private socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  handleDisconnect(client: Socket) {
    client.disconnect(true);
    client.removeAllListeners();
    const i = this.socketService.connectedClients.indexOf(client);
    this.socketService.connectedClients.splice(i, 1);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    client.setMaxListeners(4);
    this.socketService.connectedClients.push(client);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
