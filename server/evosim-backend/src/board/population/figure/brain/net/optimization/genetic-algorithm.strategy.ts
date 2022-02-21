import { OptimizationStrategy } from './optimization.strategy';
import { FigureEntity } from '../../../figure.entity';
import { PopulationEntity } from '../../../../population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';
import { MultiLayerNetFactory } from '../multi-layer-net.factory';

export class GeneticAlgorithmStrategy extends OptimizationStrategy {
  public readonly MAXIMUM_MUTATION_RATE = 0.1;
  public readonly SEPARATION = (1 - this.MAXIMUM_MUTATION_RATE) / 2;

  constructor() {
    super('GeneticCrossover');
  }

  evolve(
    figureDied: FigureEntity,
    fittestFigure: FigureEntity,
    populationFigureDied: PopulationEntity,
  ): MultiLayerNetEntity {
    const newNet = MultiLayerNetFactory.newMultiLayerNet(
      populationFigureDied.netSchema,
      populationFigureDied.activationStrategy,
    );
    for (let i = 0; i < newNet.edges().length; i++) {
      const r = Math.random();
      if (r >= this.MAXIMUM_MUTATION_RATE) {
        const edge = newNet.edges()[i];
        if (r >= this.SEPARATION) {
          edge.weight = fittestFigure.brain.net.edges()[i].weight;
        } else {
          edge.weight = figureDied.brain.net.edges()[i].weight;
        }
      }
    }
    return newNet;
  }
}
