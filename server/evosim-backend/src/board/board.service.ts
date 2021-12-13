import { Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { BlobDto } from '../blob/blob.dto';

@Injectable()
export class BoardService {
  private _board: BoardEntity;

  public static readonly TICKS_PER_SECOND = 20;

  constructor(private readonly socketService: SocketService) {
    this._board = new BoardEntity();
  }

  @Interval(1000 / BoardService.TICKS_PER_SECOND)
  private runGameTick(): void {
    this.board.runOneTick();
    if (this.socketService.connectedClients.length > 0) {
      this.socketService.sendAllWs('state', {
        map: this.board.map.toDto(),
        blobs: this.board.blobs.map<BlobDto>((b) => b.toDto()),
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
