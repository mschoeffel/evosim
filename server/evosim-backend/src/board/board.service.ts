import { Logger, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { BlobDto } from '../blob/blob.dto';
import { ProtocolService } from '../protocol/protocol.service';
import { BoardConfig } from './board.config';
import { DumpService } from '../dump/dump.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { GenerationDumpService } from '../dump/generation-dump.service';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);
  private _board: BoardEntity;
  private _run: number;

  constructor(
    private readonly socketService: SocketService,
    private readonly protocolService: ProtocolService,
    private readonly dumpService: DumpService,
    private readonly generationDumpService: GenerationDumpService,
    private readonly snapshotService: SnapshotService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this._board = new BoardEntity(generationDumpService);
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

        this._board.stop();
        this.logger.log(`Board stopped of run ${this.run}.`);
        if (BoardConfig.DUMP) {
          this.dumpService.createDump(this.board, this.run);
        }
        if (BoardConfig.SNAPSHOT) {
          this.snapshotService.writeSnapshot(this.board, this.run);
        }

        if (this.run >= BoardConfig.RUN_AMOUNT) {
          this.logger.log(
            `Run ${this.run} of max ${BoardConfig.RUN_AMOUNT} reached.`,
          );
          clearInterval(this.schedulerRegistry.getInterval('gametick'));
          this.logger.warn(`Gametick stopped!`);
        } else {
          this._board = new BoardEntity(this.generationDumpService);
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
