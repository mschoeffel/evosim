import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';
import { TileEntity } from '../tile/tile.entity';
import { TileMapper } from '../mapper/tile.mapper';
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

  protected generateMap(): Array<Array<TileEntity>> {
    return TileMapper.map(
      new SimplexNoiseGenerator().generate(this.width, this.height),
    );
  }
}
