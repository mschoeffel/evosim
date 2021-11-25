import { MapGeneratorStrategy } from './generaror/map-generator-strategy.interface';
import { TileMapper } from './mapper/TileMapper';
import { Tile } from './tile/Tile';
import { MapDto } from './map.dto';
import { MapRegrowStrategy } from './regrow/map-regrow-strategy.interface';

export class MapEntity {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _tilesize: number;
  private _generator: MapGeneratorStrategy;
  private _regrow: MapRegrowStrategy;
  private _map: Array<Array<Tile>>;

  constructor(
    generator: MapGeneratorStrategy,
    regrow: MapRegrowStrategy,
    width: number,
    height: number,
    tilesize: number,
  ) {
    this._generator = generator;
    this._regrow = regrow;
    this._width = width;
    this._height = height;
    this._tilesize = tilesize;
    this.generateMap();
  }

  public generateMap(): void {
    this._map = TileMapper.map(
      this._generator.generate(this._width, this._height),
    );
  }

  public getTileAt(x: number, y: number): Tile {
    x = Math.floor(x);
    y = Math.floor(y);
    const mapColumn = this.map.at(x);
    if (mapColumn !== undefined) {
      return mapColumn.at(y);
    }
    return undefined;
  }

  public regenerate(): void {
    for (const mapColumn of this.map) {
      for (const mapRowTile of mapColumn) {
        this.regrow.regrowTile(mapRowTile, this.map);
      }
    }
  }

  public toDto(): MapDto {
    const dto = new MapDto();
    dto.tilesize = this.tilesize;
    dto.width = this.width;
    dto.height = this.height;
    for (const mapColumn of this.map) {
      let dtoWidth = [];
      for (const mapRowTile of mapColumn) {
        dtoWidth.push(mapRowTile.toDto());
      }
      dto.map.push(dtoWidth);
      dtoWidth = [];
    }
    return dto;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get generator(): MapGeneratorStrategy {
    return this._generator;
  }

  set generator(value: MapGeneratorStrategy) {
    this._generator = value;
  }

  get map(): Array<Array<Tile>> {
    return this._map;
  }

  set map(value: Array<Array<Tile>>) {
    this._map = value;
  }

  get tilesize(): number {
    return this._tilesize;
  }

  get regrow(): MapRegrowStrategy {
    return this._regrow;
  }

  set regrow(value: MapRegrowStrategy) {
    this._regrow = value;
  }
}
