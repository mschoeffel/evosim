import { PopulationGenerationStatsDto } from './population-generation-stats.dto';

export class PopulationGenerationStatsEntity {
  private _avgLifetime: number;
  private _generation: number;
  private _avgEnergy: number;
  private _maxEnergy: number;
  private _maxLifetime: number;
  private _population: number;
  private _tick: number;
  private _run: number;

  public toDto(): PopulationGenerationStatsDto {
    const dto = new PopulationGenerationStatsDto();
    dto.avgLifetime = this.avgLifetime;
    dto.generation = this.generation;
    dto.avgEnergy = this.avgEnergy;
    dto.maxEnergy = this.maxEnergy;
    dto.maxLifetime = this.maxLifetime;
    dto.population = this.population;
    dto.tick = this.tick;
    dto.run = this.run;
    return dto;
  }

  get avgLifetime(): number {
    return this._avgLifetime;
  }

  set avgLifetime(value: number) {
    this._avgLifetime = value;
  }

  get generation(): number {
    return this._generation;
  }

  set generation(value: number) {
    this._generation = value;
  }

  get avgEnergy(): number {
    return this._avgEnergy;
  }

  set avgEnergy(value: number) {
    this._avgEnergy = value;
  }

  get maxEnergy(): number {
    return this._maxEnergy;
  }

  set maxEnergy(value: number) {
    this._maxEnergy = value;
  }

  get maxLifetime(): number {
    return this._maxLifetime;
  }

  set maxLifetime(value: number) {
    this._maxLifetime = value;
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }

  get tick(): number {
    return this._tick;
  }

  set tick(value: number) {
    this._tick = value;
  }

  get run(): number {
    return this._run;
  }

  set run(value: number) {
    this._run = value;
  }
}
