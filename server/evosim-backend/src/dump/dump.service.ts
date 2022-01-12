import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DumpEntity } from './dump.entity';
import { BoardEntity } from '../board/board.entity';

@Injectable()
export class DumpService {
  constructor(
    @InjectRepository(DumpEntity)
    private dumpEntityRepository: Repository<DumpEntity>,
  ) {}

  create(dump: DumpEntity): Promise<DumpEntity> {
    return this.dumpEntityRepository.save(dump);
  }

  createDump(board: BoardEntity): void {
    for (const population of board.populations) {
      const stats = population.getStats();
      const dump = new DumpEntity();
      dump.population = population.index;
      dump.tick = board.gamestate.currentTick;
      dump.avgGeneration = stats.avgGeneration;
      dump.avgLifetime = stats.avgLifetime;
      dump.avgEnergy = stats.avgEnergy;
      dump.maxLifetime = stats.maxLifetime;
      dump.maxEnergy = stats.maxEnergy;
      this.create(dump);
    }
  }

  findAll(): Promise<DumpEntity[]> {
    return this.dumpEntityRepository.find();
  }

  findOne(id: string): Promise<DumpEntity> {
    return this.dumpEntityRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dumpEntityRepository.delete(id);
  }
}
