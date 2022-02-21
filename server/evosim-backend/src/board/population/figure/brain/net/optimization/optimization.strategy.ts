import { FigureEntity } from '../../../figure.entity';
import { PopulationEntity } from '../../../../population.entity';
import { MultiLayerNetEntity } from '../multi-layer-net.entity';

export abstract class OptimizationStrategy {
  private readonly _name;

  protected constructor(name: string) {
    this._name = name;
  }

  public abstract evolve(
    figureDied: FigureEntity,
    fittestFigure: FigureEntity,
    populationFigureDied: PopulationEntity,
  ): MultiLayerNetEntity;

  get name() {
    return this._name;
  }
}
