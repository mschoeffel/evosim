import { PopulationGenerationStatsDto } from './population/population-generation-stats.dto';

export class GamestateDto {
  private _ticksPerSecond: number;
  private _populations: number;
  private _figuresPerPopulation: number;
  private _currentTick: number;
  private _stats: Array<PopulationGenerationStatsDto>;
  private _run: number;

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

  get figuresPerPopulation(): number {
    return this._figuresPerPopulation;
  }

  set figuresPerPopulation(value: number) {
    this._figuresPerPopulation = value;
  }

  get currentTick(): number {
    return this._currentTick;
  }

  set currentTick(value: number) {
    this._currentTick = value;
  }

  get stats(): Array<PopulationGenerationStatsDto> {
    return this._stats;
  }

  set stats(value: Array<PopulationGenerationStatsDto>) {
    this._stats = value;
  }

  get run(): number {
    return this._run;
  }

  set run(value: number) {
    this._run = value;
  }
}
