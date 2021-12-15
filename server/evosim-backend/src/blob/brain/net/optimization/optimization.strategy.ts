import { BlobEntity } from '../../../blob.entity';
import { PopulationEntity } from '../../../../population/population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export abstract class OptimizationStrategy {
  public abstract evolve(
    BlobDied: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity;
}
