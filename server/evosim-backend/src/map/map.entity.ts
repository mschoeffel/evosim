import { MapRegrowStrategy } from './regrow/map-regrow.strategy';
import { Tile } from './tile/Tile';
import { MapDto } from './map.dto';

export abstract class MapEntity {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _tileSize: number;
  private readonly _regrowStrategy: MapRegrowStrategy;
  private _map: Array<Array<Tile>>;

  protected constructor(
    width: number,
    height: number,
    tileSize: number,
    regrowStrategy: MapRegrowStrategy,
  ) {
    this._width = width;
    this._height = height;
    this._tileSize = tileSize;
    this._regrowStrategy = regrowStrategy;
    this._map = this.generateMap();
  }

  protected abstract generateMap(): Array<Array<Tile>>;

  public getTileAt(x: number, y: number): Tile {
    x = Math.floor(x);
    y = Math.floor(y);
    const mapColumn = this.map[y];
    if (mapColumn !== undefined) {
      return mapColumn[x];
    }
    return undefined;
  }

  public regenerate(): void {
    for (const mapColumn of this.map) {
      for (const mapRowTile of mapColumn) {
        this.regrowStrategy.regrowTile(mapRowTile, this);
      }
    }
  }

  public toDto(): MapDto {
    const dto = new MapDto();
    dto.tilesize = this.tileSize;
    dto.width = this.width;
    dto.height = this.height;
    for (const mapColumn of this.map) {
      let dtoWidth = [];
      for (const mapRowTile of mapColumn) {
        dtoWidth.push(mapRowTile.energy);
      }
      dto.map.push(dtoWidth);
      dtoWidth = [];
    }
    return dto;
  }

  get tileSize(): number {
    return this._tileSize;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get regrowStrategy(): MapRegrowStrategy {
    return this._regrowStrategy;
  }

  get map(): Array<Array<Tile>> {
    return this._map;
  }

  set map(value: Array<Array<Tile>>) {
    this._map = value;
  }
}
