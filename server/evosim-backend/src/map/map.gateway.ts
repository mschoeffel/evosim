//import {
//    OnGatewayConnection,
//    OnGatewayDisconnect,
//    OnGatewayInit, SubscribeMessage,
//    WebSocketGateway,
//    WebSocketServer
//} from "@nestjs/websockets";
//import { Socket, Server } from 'socket.io';
//import { Logger } from '@nestjs/common';
//
//@WebSocketGateway()
//export class MapGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
//
//    @WebSocketServer() server: Server;
//    private logger: Logger = new Logger('MapGateway');
//
//    @SubscribeMessage('map')
//    handleMessage(client: Socket, payload: string): void {
//        this.server.emit('map', payload);
//    }
//
//    afterInit(server: Server) {
//        this.logger.log('Init');
//    }
//
//    handleDisconnect(client: Socket) {
//        this.logger.log(`Client disconnected: ${client.id}`);
//    }
//
//    handleConnection(client: Socket, ...args: any[]) {
//        this.server.emit('map', {data: 'hallo'});
//        this.logger.log(`Client connected: ${client.id}`);
//    }
//
//
//    public sedUpdate(){
//        this.server.emit('map', Math.random);
//    }
//}
