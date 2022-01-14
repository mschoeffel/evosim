import { Logger, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { BlobDto } from '../blob/blob.dto';
import { ProtocolService } from '../protocol/protocol.service';
import { BoardConfig } from './board.config';
import { DumpService } from '../dump/dump.service';
import { SnapshotService } from '../snapshot/snapshot.service';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);
  private _board: BoardEntity;
  private _run: number;

  public static readonly TICKS_PER_SECOND = 20;

  constructor(
    private readonly socketService: SocketService,
    private readonly protocolService: ProtocolService,
    private readonly dumpService: DumpService,
    private readonly snapshotService: SnapshotService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this._board = new BoardEntity();
    this._run = 1;
  }

  @Interval('gametick', 1000 / BoardConfig.TICKS_PER_SECOND)
  private runGameTick(): void {
    try {
      this.board.runOneTick();
    } catch (e) {
      this.logger.error(e);
    }
    //TODO: Optimize
    const currentTick = this.board.gamestate.currentTick;
    if (currentTick % BoardConfig.LOG_INTERVAL === 0) {
      this.logger.log(`Current Run: ${this.run} Tick: ${currentTick}`);
    }
    if (BoardConfig.PROTOCOL) {
      this.protocolService.createProtocol(this.board);
    }
    if (BoardConfig.DUMP && currentTick % BoardConfig.DUMP_INTERVAL === 0) {
      this.dumpService.createDump(this.board, this.run);
    }
    if (
      BoardConfig.SNAPSHOT &&
      currentTick % BoardConfig.SNAPSHOT_INTERVAL === 0
    ) {
      this.snapshotService.writeSnapshot(this.board, this.run);
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
    if (BoardConfig.RUNS) {
      if (currentTick >= BoardConfig.RUN_TICKS) {
        this.logger.log(
          `Run ${this.run} Tick ${currentTick} of max ${BoardConfig.RUN_TICKS} reached.`,
        );
        if (this.run >= BoardConfig.RUN_AMOUNT) {
          this.logger.log(
            `Run ${this.run} of max ${BoardConfig.RUN_AMOUNT} reached.`,
          );
          const interval = this.schedulerRegistry.getInterval('gametick');
          clearInterval(interval);
          this.logger.warn(`Gametick stopped!`);
        } else {
          const intervals = this.schedulerRegistry.getIntervals();
          intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
          this._board = new BoardEntity();
          this.run++;
          this.logger.log(`Creating new Run ${this.run}.`);
        }
      }
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

  get run(): number {
    return this._run;
  }

  set run(value: number) {
    this._run = value;
  }
}
