import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DumpEntity } from './dump.entity';
import { BoardEntity } from '../board/board.entity';

@Injectable()
export class DumpService {
  private readonly logger = new Logger(DumpService.name);

  constructor(
    @InjectRepository(DumpEntity)
    private dumpEntityRepository: Repository<DumpEntity>,
  ) {}

  create(dump: DumpEntity): Promise<DumpEntity> {
    return this.dumpEntityRepository.save(dump);
  }

  createDump(board: BoardEntity, run: number): void {
    for (const population of board.populations) {
      const stats = population.getStats();
      const dump = new DumpEntity();
      dump.run = run;
      dump.population = population.index;
      dump.tick = board.gamestate.currentTick;
      dump.avgGeneration = stats.avgGeneration;
      dump.avgLifetime = stats.avgLifetime;
      dump.avgEnergy = stats.avgEnergy;
      dump.maxLifetime = stats.maxLifetime;
      dump.maxEnergy = stats.maxEnergy;
      this.create(dump)
        .then(() =>
          this.logger.log(
            `Dump for Population ${population.index} written at Tick: ${board.gamestate.currentTick}`,
          ),
        )
        .catch((e) => this.logger.error(`Error creating dump ${e}`));
    }
  }
}
