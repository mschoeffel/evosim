export class FigureSenses {
  private _currentEnergy: number;
  private _energyOfCurrentTile: number;
  private _energyOfTileAhead: number;
  private _waterAhead: number;

  public static count(): number {
    return 4;
  }

  get currentEnergy(): number {
    return this._currentEnergy;
  }

  set currentEnergy(value: number) {
    this._currentEnergy = value;
  }

  get energyOfCurrentTile(): number {
    return this._energyOfCurrentTile;
  }

  set energyOfCurrentTile(value: number) {
    this._energyOfCurrentTile = value;
  }

  get energyOfTileAhead(): number {
    return this._energyOfTileAhead;
  }

  set energyOfTileAhead(value: number) {
    this._energyOfTileAhead = value;
  }

  get waterAhead(): number {
    return this._waterAhead;
  }

  set waterAhead(value: number) {
    this._waterAhead = value;
  }
}
