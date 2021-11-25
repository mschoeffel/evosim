export class BlobSenses {
  private _currentPositionX: number;
  private _currentPositionY: number;
  private _currentDirection: number;
  private _currentEnergy: number;
  private _energyOfCurrentTile: number;
  private _energyOfTileAhead: number;

  get currentPositionX(): number {
    return this._currentPositionX;
  }

  set currentPositionX(value: number) {
    this._currentPositionX = value;
  }

  get currentPositionY(): number {
    return this._currentPositionY;
  }

  set currentPositionY(value: number) {
    this._currentPositionY = value;
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
