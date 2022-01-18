import { OptimizationStrategy } from './optimization.strategy';
import { BlobEntity } from '../../../blob.entity';
import { PopulationEntity } from '../../../../population/population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';
import { MultiLayerNetFactory } from '../multi-layer-net.factory';

export class GeneticAlgorithmStrategy extends OptimizationStrategy {
  public readonly MAXIMUM_MUTATION_RATE = 0.1;
  public readonly SEPARATION = (1 - this.MAXIMUM_MUTATION_RATE) / 2;

  constructor() {
    super('GeneticCrossover');
  }

  evolve(
    blobDied: BlobEntity,
    blobFittest: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity {
    const newNet = MultiLayerNetFactory.newMultiLayerNet(
      populationBlobDied.netSchema,
      populationBlobDied.activationStrategy,
    );
    const index = 0;
    for (const edge of newNet.edges()) {
      const r = Math.random();
      if (r >= this.MAXIMUM_MUTATION_RATE) {
        if (r >= this.SEPARATION) {
          edge.weight = blobFittest.brain.net.edges()[index].weight;
        } else {
          edge.weight = blobDied.brain.net.edges()[index].weight;
        }
      }
    }
    return newNet;
  }
}
