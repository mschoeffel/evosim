import { Logger, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';
import { FigureDto } from './population/figure/figure.dto';
import { ProtocolService } from '../protocol/protocol.service';
import { BoardConfig } from './board.config';
import { DumpService } from '../dump/dump.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { GenerationDumpService } from '../dump/generation-dump.service';

@Injectable()
export class BoardService {
  private static readonly INTERVAL_NAME = 'gametick';
  private readonly logger = new Logger(BoardService.name);
  private _board: BoardEntity;

  constructor(
    private readonly socketService: SocketService,
    private readonly protocolService: ProtocolService,
    private readonly dumpService: DumpService,
    private readonly generationDumpService: GenerationDumpService,
    private readonly snapshotService: SnapshotService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this._board = new BoardEntity(generationDumpService);
  }

  @Interval(BoardService.INTERVAL_NAME, 1000 / BoardConfig.TICKS_PER_SECOND)
  private runGameTick(): void {
    try {
      this.board.runOneTick();
      this.updateClients();
    } catch (e) {
      this.logger.error(e);
    } finally {
      const currentTick = this.board.gamestate.currentTick;
      this.writeStatistics(currentTick);
      this.manageRuns(currentTick);
    }
  }

  private updateClients(): void {
    if (
      BoardConfig.RENDER_WEBSOCKET &&
      this.socketService.connectedClients.length > 0
    ) {
      this.socketService.sendAllWs('state', {
        map: this.board.map.toDto(),
        figures: this.board.figures().map<FigureDto>((b) => b.toDto()),
        gamestate: this.board.gamestate.toDto(),
      });
    }
  }

  private writeStatistics(currentTick: number): void {
    this.writeLog(currentTick);
    this.writeDump(currentTick);
    this.writeSnapshot(currentTick);
    this.writeProtocol();
  }

  private manageRuns(currentTick: number): void {
    if (BoardConfig.RUNS) {
      if (currentTick >= BoardConfig.RUN_TICKS) {
        this.logger.log(
          `Run ${this.board.gamestate.run} Tick ${currentTick} of max ${BoardConfig.RUN_TICKS} reached.`,
        );

        this.board.stop();
        this.logger.log(`Board stopped of run ${this.board.gamestate.run}.`);
        if (BoardConfig.DUMP) {
          this.dumpService.createDump(this.board, this.board.gamestate.run);
        }
        if (BoardConfig.SNAPSHOT) {
          this.snapshotService.writeSnapshot(
            this.board,
            this.board.gamestate.run,
          );
        }

        if (this.board.gamestate.run >= BoardConfig.RUN_AMOUNT) {
          this.logger.log(
            `Run ${this.board.gamestate.run} of max ${BoardConfig.RUN_AMOUNT} reached.`,
          );
          clearInterval(
            this.schedulerRegistry.getInterval(BoardService.INTERVAL_NAME),
          );
          this.logger.warn(`Gametick stopped!`);
        } else {
          const lastRun = this.board.gamestate.run;
          this.board = new BoardEntity(this.generationDumpService);
          this.board.gamestate.run = lastRun + 1;
          this.logger.log(`Creating new Run ${this.board.gamestate.run}.`);
        }
      }
    }
  }

  private writeLog(currentTick: number): void {
    if (currentTick % BoardConfig.LOG_INTERVAL === 0) {
      this.logger.log(
        `Current Run: ${this.board.gamestate.run} Tick: ${currentTick}`,
      );
    }
  }

  private writeSnapshot(currentTick: number): void {
    if (
      BoardConfig.SNAPSHOT &&
      currentTick % BoardConfig.SNAPSHOT_INTERVAL === 0
    ) {
      this.snapshotService.writeSnapshot(this.board, this.board.gamestate.run);
    }
  }

  private writeDump(currentTick: number): void {
    if (BoardConfig.DUMP && currentTick % BoardConfig.DUMP_INTERVAL === 0) {
      this.dumpService.createDump(this.board, this.board.gamestate.run);
    }
  }

  private writeProtocol(): void {
    if (BoardConfig.PROTOCOL) {
      this.protocolService.createProtocol(this.board);
    }
  }

  get board(): BoardEntity {
    return this._board;
  }

  set board(value: BoardEntity) {
    this._board = value;
  }
}
