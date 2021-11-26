export class MapClientDto {
  _tilesize: number;
  _width: number;
  _height: number;
  _map: Array<Array<number>>;


  constructor() {
    this._tilesize = 0;
    this._width = 0;
    this._height = 0;
    this._map = [[]];
  }
}
