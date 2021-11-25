import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
  public server: Server = null;
  public connectedClients: Array<Socket> = [];

  public sendAllWs(key: string, data: any): void {
    this.server.volatile.emit(key, data);
  }
}
