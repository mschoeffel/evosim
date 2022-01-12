import { Logger, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { BlobDto } from '../blob/blob.dto';
import { ProtocolService } from '../protocol/protocol.service';
import { BoardConfig } from './board.config';
import { DumpService } from '../dump/dump.service';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);
  private _board: BoardEntity;

  public static readonly TICKS_PER_SECOND = 20;

  constructor(
    private readonly socketService: SocketService,
    private readonly protocolService: ProtocolService,
    private readonly dumpService: DumpService,
  ) {
    this._board = new BoardEntity();
  }

  @Interval(1000 / BoardConfig.TICKS_PER_SECOND)
  private runGameTick(): void {
    try {
      this.board.runOneTick();
    } catch (e) {
      this.logger.error(e);
    }
    const currentTick = this.board.gamestate.currentTick;
    if (currentTick % BoardConfig.LOG_INTERVAL === 0) {
      this.logger.log(`Current Tick: ${currentTick}`);
    }
    if (BoardConfig.PROTOCOL) {
      this.protocolService.createProtocol(this.board);
    }
    if (BoardConfig.DUMP && currentTick % BoardConfig.DUMP_INTERVAL === 0) {
      this.dumpService.createDump(this.board);
      this.logger.log(`Dump written at Tick: ${currentTick}`);
    }
    if (
      BoardConfig.RENDER_WEBSOCKET &&
      this.socketService.connectedClients.length > 0
    ) {
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
