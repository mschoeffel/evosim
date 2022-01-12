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
    BlobDied: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity {
    const blobs = [populationBlobDied.blobs[0], populationBlobDied.blobs[1]];
    blobs.sort((a, b) => {
      return a.score() - b.score();
    });
    for (const blob of populationBlobDied.blobs) {
      if (blob.score() > blobs[0].score()) {
        blobs[0] = blob;
        blobs.sort((a, b) => {
          return a.score() - b.score();
        });
      }
    }
    const fittestBlob = blobs[1];
    const secondFittestBlob = blobs[0];

    const newNet = MultiLayerNetFactory.newMultiLayerNet(
      populationBlobDied.netSchema,
      populationBlobDied.activationStrategy,
    );
    const index = 0;
    for (const edge of newNet.edges()) {
      const r = Math.random();
      if (r >= this.MAXIMUM_MUTATION_RATE) {
        if (r >= this.SEPARATION) {
          edge.weight = fittestBlob.brain.net.edges()[index].weight;
        } else {
          edge.weight = secondFittestBlob.brain.net.edges()[index].weight;
        }
      }
    }
    return newNet;
  }
}
