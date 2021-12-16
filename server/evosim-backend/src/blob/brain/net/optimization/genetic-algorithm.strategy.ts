import { OptimizationStrategy } from './optimization.strategy';
import { BlobEntity } from '../../../blob.entity';
import { PopulationEntity } from '../../../../population/population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export class GeneticAlgorithmStrategy extends OptimizationStrategy {
  public readonly MAXIMUM_MUTATION_RATE = 0.1;

  constructor() {
    super('GeneticCrossover');
  }

  evolve(
    BlobDied: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity {
    const blobs = [populationBlobDied.blobs[0], populationBlobDied.blobs[1]];
    blobs.sort((a, b) => {
      return a.ticksAlive - b.ticksAlive;
    });
    for (const blob of populationBlobDied.blobs) {
      if (blob.ticksAlive > blobs[0].ticksAlive) {
        blobs[0] = blob;
        blobs.sort((a, b) => {
          return a.ticksAlive - b.ticksAlive;
        });
      }
    }
    const fittestBlob = blobs[1];
    const secondFittestBlob = blobs[0];

    const newNet = new MultiLayerNetEntity(
      populationBlobDied.netSchema,
      populationBlobDied.activationStrategy,
    );
    const index = 0;
    for (const edge of newNet.edges) {
      const r = Math.random();
      if (r >= this.MAXIMUM_MUTATION_RATE) {
        if (r >= 0.5) {
          edge.weight = fittestBlob.brain.net.edges[index].weight;
        } else {
          edge.weight = secondFittestBlob.brain.net.edges[index].weight;
        }
      }
    }
    return newNet;
  }
}
