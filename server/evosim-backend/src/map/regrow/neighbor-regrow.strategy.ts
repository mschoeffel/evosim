import { MapRegrowStrategy } from './map-regrow.strategy';
import { Tile } from '../tile/Tile';
import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';

export class NeighborRegrowStrategy extends MapRegrowStrategy {
  private readonly regrowRate;

  constructor(regrowRate: number) {
    super();
    this.regrowRate = regrowRate;
  }

  regrowTile(tile: Tile, map?: MapEntity): void {
    if (tile.energy >= 0) {
      const neighborTiles = NeighborRegrowStrategy.findNeighborsOfTile(
        tile,
        map.map,
      );
      let countGrassNeighbors = 0;
      let sumGrassNeighborsEnergy = 0;
      for (const neighborTile of neighborTiles) {
        if (neighborTile.energy > 0) {
          countGrassNeighbors++;
          sumGrassNeighborsEnergy += neighborTile.energy;
        }
      }
      const maxSumGrassNeighborsEnergy = countGrassNeighbors * 100;
      const p = sumGrassNeighborsEnergy / maxSumGrassNeighborsEnergy;

      let amount = this.regrowRate * p;
      if (tile.energy + amount > MapConfig.MAX_ENERGY_OF_TILE) {
        amount = MapConfig.MAX_ENERGY_OF_TILE - tile.energy;
      }
      tile.energy += amount;
    }
  }

  private static findNeighborsOfTile(
    tile: Tile,
    map: Array<Array<Tile>>,
  ): Array<Tile> {
    const neighborTiles = [];
    const neighborSet = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    const x = tile.x;
    const y = tile.y;

    for (const neighbor of neighborSet) {
      if (NeighborRegrowStrategy.isOnMap(x + neighbor.x, y + neighbor.y, map)) {
        neighborTiles.push(map[y + neighbor.y][x + neighbor.x]);
      }
    }

    return neighborTiles;
  }

  private static isOnMap(
    x: number,
    y: number,
    map: Array<Array<Tile>>,
  ): boolean {
    return x >= 0 && y >= 0 && x < map[0].length && y < map.length;
  }
}
