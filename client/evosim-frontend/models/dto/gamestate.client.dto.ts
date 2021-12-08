export class GamestateClientDto {
  _ticksPerSecond: number;
  _populations: number;
  _creaturesPerPopulation: number;
  _currentTick: number;

  constructor() {
    this._creaturesPerPopulation = 0;
    this._currentTick = 0;
    this._populations = 0;
    this._ticksPerSecond = 0;
  }
}
