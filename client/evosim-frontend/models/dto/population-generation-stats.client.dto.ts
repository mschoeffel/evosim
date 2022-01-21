export class PopulationGenerationStatsDto {
  _avgLifetime: number;
  _generation: number;
  _avgEnergy: number;
  _maxEnergy: number;
  _maxLifetime: number;
  _population: number;
  _tick: number;

  constructor() {
    this._avgLifetime = 0;
    this._generation = 0;
    this._avgEnergy = 0;
    this._maxEnergy = 0;
    this._maxLifetime = 0;
    this._population = 0;
    this._tick = 0;
  }
}
