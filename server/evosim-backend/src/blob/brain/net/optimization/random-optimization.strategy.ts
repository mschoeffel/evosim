import { OptimizationStrategy } from './optimization.strategy';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';
import { SigmoidActivationStrategy } from '../nodes/activation/sigmoid-activation.strategy';
import { BlobEntity } from '../../../blob.entity';
import { PopulationEntity } from '../../../../population/population.entity';
import { MultiLayerNetFactory } from '../multi-layer-net.factory';

export class RandomOptimizationStrategy extends OptimizationStrategy {
  public readonly MAXIMUM_WEIGHT = 10;
  public readonly MUTATION_RATE_MUTABILITY = 0.01;
  public readonly MAXIMUM_MUTATION_RATE = 0.1;

  constructor() {
    super('RandomPermutation');
  }

  evolve(
    blobDied: BlobEntity,
    populationBlobDied: PopulationEntity,
  ): MultiLayerNetEntity {
    const net = populationBlobDied.getFittestBlobOfPopulation().brain.net;
    const newNet = MultiLayerNetFactory.newMultiLayerNet(
      populationBlobDied.netSchema,
      populationBlobDied.activationStrategy,
    );
    for (let i = 0; i < newNet.edges.length; i++) {
      const targetEdge = newNet.edges()[i];
      const srcEdge = net.edges()[i];
      if (targetEdge !== undefined && srcEdge !== undefined) {
        targetEdge.weight = RandomOptimizationStrategy.calcMutation(
          srcEdge.weight,
          srcEdge.mutation,
          this.MAXIMUM_WEIGHT,
        );
        targetEdge.mutation = RandomOptimizationStrategy.calcMutation(
          srcEdge.mutation,
          this.MUTATION_RATE_MUTABILITY,
          this.MAXIMUM_MUTATION_RATE,
        );
      }
    }
    return newNet;
  }

  private static calcMutation(
    input: number,
    rate: number,
    max: number,
  ): number {
    let mutatedOutput = input;
    if (Math.random() < rate) {
      mutatedOutput *= Math.random() * 2 - 1;
    }
    if (Math.abs(mutatedOutput) > max) {
      mutatedOutput =
        new SigmoidActivationStrategy().evaluate(mutatedOutput) * max;
    }
    return mutatedOutput;
  }
}
