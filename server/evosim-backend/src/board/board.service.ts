import { Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { BlobDto } from '../blob/blob.dto';
import { ProtocolService } from '../protocol/protocol.service';
import { ProtocolEntity } from '../protocol/protocol.entity';

@Injectable()
export class BoardService {
  private _board: BoardEntity;

  public static readonly TICKS_PER_SECOND = 20;
  public static readonly PROTOCOL = false;

  constructor(
    private readonly socketService: SocketService,
    private readonly protocolService: ProtocolService,
  ) {
    this._board = new BoardEntity();
  }

  @Interval(1000 / BoardService.TICKS_PER_SECOND)
  private runGameTick(): void {
    this.board.runOneTick();
    if (BoardService.PROTOCOL) {
      for (const blob of this.board.blobs()) {
        const protocol = new ProtocolEntity();
        protocol.tick = this.board.gamestate.currentTick;
        protocol.creatureId = blob.id;
        protocol.population = blob.population;
        protocol.positionX = blob.positionX;
        protocol.positionY = blob.positionY;
        protocol.energy = blob.energy;
        protocol.direction = blob.direction;
        protocol.ticksAlive = blob.ticksAlive;
        protocol.tickBorn = blob.initTick;
        protocol.algortithm = blob.algorithm;
        protocol.activation = blob.activation;
        protocol.generation = blob.generation;
        this.protocolService.create(protocol).then();
      }
    }
    if (this.socketService.connectedClients.length > 0) {
      this.socketService.sendAllWs('state', {
        map: this.board.map.toDto(),
        blobs: this.board.blobs().map<BlobDto>((b) => b.toDto()),
        gamestate: this.board.gamestate.toDto(),
      });
    }
  }

  //@Interval(2000)
  /*
  private resetGC(): void {
    global.gc();
    //console.log('GC done')
    //this.board = new BoardEntity();
  }
  */

  get board(): BoardEntity {
    return this._board;
  }

  set board(value: BoardEntity) {
    this._board = value;
  }
}
