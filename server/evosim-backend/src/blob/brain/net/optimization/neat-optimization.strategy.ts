import { OptimizationStrategy } from './optimization.strategy';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export class NeatOptimizationStrategy extends OptimizationStrategy {
  constructor() {
    super('NEAT');
  }

  evolve(): MultiLayerNetEntity {
    return undefined;
  }
}
