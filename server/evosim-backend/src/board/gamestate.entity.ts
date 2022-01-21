import { GamestateDto } from './gamestate.dto';
import { BoardConfig } from './board.config';
import { PopulationGenerationStatsDto } from '../population/population-generation-stats.dto';
import { PopulationGenerationStatsEntity } from '../population/population-generation-stats.entity';

export class GamestateEntity {
  private _ticksPerSecond: number;
  private _populations: number;
  private _creaturesPerPopulation: number;
  private _currentTick: number;
  private _stats: Array<PopulationGenerationStatsEntity>;

  constructor(populations: number, creaturesPerPopulation: number) {
    this._ticksPerSecond = BoardConfig.TICKS_PER_SECOND;
    this._populations = populations;
    this._creaturesPerPopulation = creaturesPerPopulation;
    this._currentTick = 0;
    this._stats = [];
  }

  public toDto(): GamestateDto {
    const dto = new GamestateDto();
    dto.ticksPerSecond = this.ticksPerSecond;
    dto.populations = this.populations;
    dto.creaturesPerPopulation = this.creaturesPerPopulation;
    dto.currentTick = this.currentTick;
    dto.stats = this.stats.map<PopulationGenerationStatsDto>((i) => i.toDto());
    return dto;
  }

  public addTick(): void {
    this.currentTick++;
  }

  get ticksPerSecond(): number {
    return this._ticksPerSecond;
  }

  set ticksPerSecond(value: number) {
    this._ticksPerSecond = value;
  }

  get populations(): number {
    return this._populations;
  }

  set populations(value: number) {
    this._populations = value;
  }

  get creaturesPerPopulation(): number {
    return this._creaturesPerPopulation;
  }

  set creaturesPerPopulation(value: number) {
    this._creaturesPerPopulation = value;
  }

  get currentTick(): number {
    return this._currentTick;
  }

  set currentTick(value: number) {
    this._currentTick = value;
  }

  get stats(): Array<PopulationGenerationStatsEntity> {
    return this._stats;
  }

  set stats(value: Array<PopulationGenerationStatsEntity>) {
    this._stats = value;
  }
}
