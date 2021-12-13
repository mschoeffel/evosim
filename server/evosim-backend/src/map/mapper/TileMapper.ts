import { GrassTile } from '../tile/GrassTile';
import { WaterTile } from '../tile/WaterTile';
import { Tile } from '../tile/Tile';

export class TileMapper {
  public static readonly BORDER = 30;

  public static map(mapData: Array<Array<number>>): Array<Array<Tile>> {
    const mappedMapColumns = [];
    for (const mapColumns of mapData) {
      const mappedMapRowTiles = [];
      for (const mapRowTiles of mapColumns) {
        if (mapRowTiles >= this.BORDER) {
          const energy = Math.round(
            ((mapRowTiles - this.BORDER) / (100 - this.BORDER)) * 100,
          );
          mappedMapRowTiles.push(new GrassTile(energy));
        } else {
          mappedMapRowTiles.push(new WaterTile());
        }
      }
      mappedMapColumns.push(mappedMapRowTiles);
    }
    return mappedMapColumns;
  }
}
