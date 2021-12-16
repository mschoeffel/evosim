import { SigmoidActivationStrategy } from '../blob/brain/net/nodes/activation/sigmoid-activation.strategy';
import { RandomOptimizationStrategy } from '../blob/brain/net/optimization/random-optimization.strategy';
import { GeneticAlgorithmStrategy } from '../blob/brain/net/optimization/genetic-algorithm.strategy';

export class BoardConfig {
  public static readonly NUMBER_OF_POPULATIONS = 5;
  public static readonly CREATURES_PER_POPULATION = 10;
  public static readonly POPULATIONS_DATA = [
    {
      netSchema: [5, 4],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [5, 5],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [5, 4],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [5, 5],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      netSchema: [8, 8, 8],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
  ];
}
