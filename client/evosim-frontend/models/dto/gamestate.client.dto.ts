import { PopulationGenerationStatsDto } from '~/models/dto/population-generation-stats.client.dto';

export class GamestateClientDto {
  _ticksPerSecond: number;
  _populations: number;
  _figuresPerPopulation: number;
  _currentTick: number;
  _stats: Array<PopulationGenerationStatsDto>;

  constructor() {
    this._figuresPerPopulation = 0;
    this._currentTick = 0;
    this._populations = 0;
    this._ticksPerSecond = 0;
    this._stats = [];
  }
}
