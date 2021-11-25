import { GrassTile } from '../tile/GrassTile';
import { WaterTile } from '../tile/WaterTile';
import { Tile } from '../tile/Tile';

export class TileMapper {
  public static readonly BORDER = 30;

  public static map(mapData: Array<Array<number>>): Array<Array<Tile>> {
    const mappedMapColumns = [];
    for (const mapColumns of mapData) {
      const mappedMapRows = [];
      for (const mapRows of mapColumns) {
        if (mapRows >= this.BORDER) {
          const energy = Math.round(
            ((mapRows - this.BORDER) / (100 - this.BORDER)) * 100,
          );
          mappedMapRows.push(new GrassTile(energy));
        } else {
          mappedMapRows.push(new WaterTile());
        }
      }
      mappedMapColumns.push(mappedMapRows);
    }
    return mappedMapColumns;
  }
}
