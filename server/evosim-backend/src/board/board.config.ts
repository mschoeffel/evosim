import { SigmoidActivationStrategy } from '../blob/brain/net/nodes/activation/sigmoid-activation.strategy';
import { RandomOptimizationStrategy } from '../blob/brain/net/optimization/random-optimization.strategy';
import { GeneticAlgorithmStrategy } from '../blob/brain/net/optimization/genetic-algorithm.strategy';
import { PopulationTypeEnum } from '../population/population-type.enum';
import { NeatOptimizationStrategy } from '../blob/brain/net/optimization/neat-optimization.strategy';

export class BoardConfig {
  public static readonly PROTOCOL = false;
  public static readonly GENERATION_DUMP = false;
  public static readonly DUMP = false;
  public static readonly DUMP_INTERVAL = 200;
  public static readonly TICKS_PER_SECOND = 10;
  public static readonly LOG_INTERVAL = 1000;
  public static readonly RENDER_WEBSOCKET = true;
  public static readonly SNAPSHOT = false;
  public static readonly SNAPSHOT_INTERVAL = 1000;
  public static readonly RUNS = false;
  public static readonly RUN_TICKS = 100000;
  public static readonly RUN_AMOUNT = 2;
  public static readonly TICK_ENERGY_COST = 0.5;
  public static readonly CREATURES_PER_POPULATION = 50;
  public static readonly POPULATIONS_DATA = [
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [4, 5, 4],
      optimization: new RandomOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.SIMPLE,
      netSchema: [4, 5, 4],
      optimization: new GeneticAlgorithmStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
    },
    {
      type: PopulationTypeEnum.NEAT,
      optimization: new NeatOptimizationStrategy(),
      activationFunction: new SigmoidActivationStrategy(),
      netSchema: [],
    },
  ];
  public static readonly MAX_OVERTIME = 2000;
  public static readonly COUNT_BLOBS_OVERTIME = 10;
}
