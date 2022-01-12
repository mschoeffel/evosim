export class PopulationStatsEntity {
  private _avgLifetime: number;
  private _avgGeneration: number;
  private _avgEnergy: number;
  private _maxEnergy: number;
  private _maxLifetime: number;

  get avgLifetime(): number {
    return this._avgLifetime;
  }

  set avgLifetime(value: number) {
    this._avgLifetime = value;
  }

  get avgGeneration(): number {
    return this._avgGeneration;
  }

  set avgGeneration(value: number) {
    this._avgGeneration = value;
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
}
