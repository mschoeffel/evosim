import { Tile } from '../tile/Tile';

export abstract class MapRegrowStrategy {
  regrowTileAt(x: number, y: number, map: Array<Array<Tile>>): void {
    const tile = map.at(x).at(y);
    this.regrowTile(tile, map);
  }

  abstract regrowTile(tile: Tile, map?: Array<Array<Tile>>): void;
}
