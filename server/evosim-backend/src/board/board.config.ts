import { SigmoidActivationStrategy } from '../blob/brain/net/nodes/activation/sigmoid-activation.strategy';
import { RandomOptimizationStrategy } from '../blob/brain/net/optimization/random-optimization.strategy';

export class BoardConfig {
  public static readonly NUMBER_OF_POPULATIONS = 5;
  public static readonly CREATURES_PER_POPULATION = 10;
  public static readonly POPULATIONS_DATA = [
    {
      netSchema: [],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [3],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [6],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [5, 5],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [6, 8, 6],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
  ];
}
