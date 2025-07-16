import { SigmoidActivationStrategy } from './population/figure/brain/net/nodes/activation/sigmoid-activation.strategy';
import { RandomOptimizationStrategy } from './population/figure/brain/net/optimization/random-optimization.strategy';
import { GeneticAlgorithmStrategy } from './population/figure/brain/net/optimization/genetic-algorithm.strategy';
import { PopulationTypeEnum } from './population/population-type.enum';
import { NeatOptimizationStrategy } from './population/figure/brain/net/optimization/neat-optimization.strategy';
import { TanhActivationStrategy } from './population/figure/brain/net/nodes/activation/tanh-activation.strategy';

export class BoardConfig {
  public static readonly PROTOCOL = false;
  public static readonly GENERATION_DUMP = true;
  public static readonly DUMP = true;
  public static readonly DUMP_INTERVAL = 10000;
  public static readonly TICKS_PER_SECOND = 30;
  public static readonly LOG_INTERVAL = 10000;
  public static readonly RENDER_WEBSOCKET = true;
  public static readonly SNAPSHOT = true;
  public static readonly SNAPSHOT_INTERVAL = 10000;
  public static readonly RUNS = true;
  public static readonly RUN_TICKS = 250000;
  public static readonly RUN_AMOUNT = 10000;
  public static readonly TICK_ENERGY_COST = 0.5;
  public static readonly FIGURES_PER_POPULATION = 80;
  public static readonly POPULATIONS_DATA = [
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [5, 6, 5],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [3, 2],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [5, 6, 5],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [3, 2],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.NEAT,
      optimization: new NeatOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
      netSchema: [],
    },
    {
      type: PopulationTypeEnum.NEAT,
      optimization: new NeatOptimizationStrategy(),
      activationFunction: new TanhActivationStrategy(),
      netSchema: [],
    },
  ];
  public static readonly MAX_OVERTIME = 2000;
  public static readonly COUNT_FIGURES_OVERTIME =
    this.FIGURES_PER_POPULATION / 10;
  public static readonly MAX_LIFETIME = 50000;
}
