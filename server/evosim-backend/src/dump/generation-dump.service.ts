import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerationDumpEntity } from './generation-dump.entity';
import { PopulationGenerationStatsEntity } from '../board/population/population-generation-stats.entity';

@Injectable()
export class GenerationDumpService {
  private readonly logger = new Logger(GenerationDumpService.name);

  constructor(
    @InjectRepository(GenerationDumpEntity)
    private dumpEntityRepository: Repository<GenerationDumpEntity>,
  ) {}

  create(dump: GenerationDumpEntity): Promise<GenerationDumpEntity> {
    return this.dumpEntityRepository.save(dump);
  }

  createDump(stats: PopulationGenerationStatsEntity): void {
    const dump = new GenerationDumpEntity();
    dump.population = stats.population;
    dump.tick = stats.tick;
    dump.run = stats.run;
    dump.generation = stats.generation;
    dump.avgLifetime = stats.avgLifetime;
    dump.avgEnergy = stats.avgEnergy;
    dump.maxLifetime = stats.maxLifetime;
    dump.maxEnergy = stats.maxEnergy;
    this.create(dump)
      .then(() =>
        this.logger.log(
          `Generation Dump for Population ${stats.population} Generation ${stats.generation} written at Tick: ${stats.tick}`,
        ),
      )
      .catch((e) => this.logger.error(`Error creating generation dump ${e}`));
  }
}
