import { NeighborRegrowStrategy } from './regrow/neighbor-regrow.strategy';
import { ZigZagMapEntity } from './predefined/zig-zag-map.entity';
import { RandomSimplexNoiseMapEntity } from './predefined/random-simplex-noise-map.entity';
import { RandomPerlinNoiseMapEntity } from './predefined/random-perlin-noise-map.entity';

export class MapConfig {
  public static readonly MAP_WIDTH = 120;
  public static readonly MAP_HEIGHT = 120;
  public static readonly MAP_TILESIZE = 5;
  public static readonly MAP_REGROW_STRATEGY = new NeighborRegrowStrategy(0.06);
  public static readonly MAX_ENERGY_OF_TILE = 100;
  public static readonly MAP = new RandomPerlinNoiseMapEntity();
}
