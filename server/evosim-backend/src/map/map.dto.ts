export class MapDto {
  private _tilesize: number;
  private _width: number;
  private _height: number;
  private _map: Array<Array<number>>;

  constructor() {
    this._map = [];
  }

  get tilesize(): number {
    return this._tilesize;
  }

  set tilesize(value: number) {
    this._tilesize = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get map(): Array<Array<number>> {
    return this._map;
  }

  set map(value: Array<Array<number>>) {
    this._map = value;
  }
}
