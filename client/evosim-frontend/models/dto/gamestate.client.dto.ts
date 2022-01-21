import { PopulationGenerationStatsDto } from '~/models/dto/population-generation-stats.client.dto';

export class GamestateClientDto {
  _ticksPerSecond: number;
  _populations: number;
  _creaturesPerPopulation: number;
  _currentTick: number;
  _stats: Array<PopulationGenerationStatsDto>;

  constructor() {
    this._creaturesPerPopulation = 0;
    this._currentTick = 0;
    this._populations = 0;
    this._ticksPerSecond = 0;
    this._stats = [];
  }
}
