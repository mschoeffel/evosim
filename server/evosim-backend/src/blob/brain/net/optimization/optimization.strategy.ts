import { BlobEntity } from '../../../blob.entity';
import { PopulationEntity } from '../../../../population/population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export abstract class OptimizationStrategy {
  private readonly _name;

  protected constructor(name: string) {
    this._name = name;
  }

  public abstract evolve(
    BlobDied: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity;

  get name() {
    return this._name;
  }
}
