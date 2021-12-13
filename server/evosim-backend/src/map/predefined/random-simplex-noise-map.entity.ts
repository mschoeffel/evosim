import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';
import { Tile } from '../tile/Tile';
import { TileMapper } from '../mapper/TileMapper';
import { SimplexNoiseGenerator } from '../generaror/simplex-noise.generator';

export class RandomSimplexNoiseMapEntity extends MapEntity {
  constructor() {
    super(
      MapConfig.MAP_WIDTH,
      MapConfig.MAP_HEIGHT,
      MapConfig.MAP_TILESIZE,
      MapConfig.MAP_REGROW_STRATEGY,
    );
  }

  protected generateMap(): Array<Array<Tile>> {
    return TileMapper.map(
      new SimplexNoiseGenerator().generate(this.width, this.height),
    );
  }
}
