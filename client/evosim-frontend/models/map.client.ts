import {TileClient} from "~/models/tile.client";
import {ServerParsableInterface} from "~/models/serverparsable.interface";
import {MapClientDto} from "~/models/dto/map.client.dto";

export class MapClient implements ServerParsableInterface<MapClientDto> {
  constructor() {
    this._tilesize = 0;
    this._width = 0;
    this._height = 0;
    this._map = [];
  }

  private _tilesize: number;

  get tilesize(): number {
    return this._tilesize;
  }

  set tilesize(value: number) {
    this._tilesize = value;
  }

  private _width: number;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  private _height: number;

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  private _map: Array<Array<TileClient>>;

  get map(): Array<Array<TileClient>> {
    return this._map;
  }

  set map(value: Array<Array<TileClient>>) {
    this._map = value;
  }

  static parseFromDto(obj: MapClientDto): MapClient {
    const o = new MapClient();
    o.parseFromDto(obj);
    return o;
  }

  parseFromDto(obj: MapClientDto): void {
    this.tilesize = obj._tilesize;
    this.width = obj._width;
    this.height = obj._height;
    for (const mapColumn of obj._map) {
      const dtoWidth = [];
      for (const mapRowTile of mapColumn) {
        const tile = new TileClient();
        tile.parseFromDto(mapRowTile);
        dtoWidth.push(tile);
      }
      this.map.push(dtoWidth);
    }
  }
}
