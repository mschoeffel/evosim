import { Tile } from '../tile/Tile';
import { MapEntity } from '../map.entity';

export abstract class MapRegrowStrategy {
  regrowTileAt(x: number, y: number, map: MapEntity): void {
    const tile = map.getTileAt(x, y);
    if (tile !== undefined) {
      this.regrowTile(tile, map);
    }
  }

  abstract regrowTile(tile: Tile, map?: MapEntity): void;
}
