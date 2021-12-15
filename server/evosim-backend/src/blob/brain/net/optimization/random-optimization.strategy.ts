import { OptimizationStrategy } from './optimization.strategy';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';
import { SigmoidActivationStrategy } from '../nodes/activation/sigmoid-activation.strategy';

export class RandomOptimizationStrategy extends OptimizationStrategy {
  public readonly MAXIMUM_WEIGHT = 10;
  public readonly MUTATION_RATE_MUTABILITY = 0.01;
  public readonly MAXIMUM_MUTATION_RATE = 0.1;

  evolve(net: MultiLayerNetEntity): MultiLayerNetEntity {
    const newNet = new MultiLayerNetEntity();
    newNet.initializeNet(net.hiddenSchema);
    for (let i = 0; i < newNet.edges.length; i++) {
      const targetEdge = newNet.edges.at(i);
      const srcEdge = net.edges.at(i);
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

  private static calcMutation(input: number, rate: number, max: number): number {
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
