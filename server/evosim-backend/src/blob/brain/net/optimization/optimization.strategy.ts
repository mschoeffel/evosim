import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export abstract class OptimizationStrategy {
  public abstract evolve(net: MultiLayerNetEntity): MultiLayerNetEntity;
}
