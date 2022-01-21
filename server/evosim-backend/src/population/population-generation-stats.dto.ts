export class PopulationGenerationStatsDto {
  private _avgLifetime: number;
  private _generation: number;
  private _avgEnergy: number;
  private _maxEnergy: number;
  private _maxLifetime: number;
  private _population: number;
  private _tick: number;

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
}
