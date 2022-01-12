export class BlobSenses {
  private _currentDirection: number;
  private _currentEnergy: number;
  private _energyOfCurrentTile: number;
  private _energyOfTileAhead: number;

  public static count(): number {
    return 4;
  }

  get currentDirection(): number {
    return this._currentDirection;
  }

  set currentDirection(value: number) {
    this._currentDirection = value;
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
}
