import { MultiLayerNetEntity } from './net/multi-layer-net.entity';
import { BlobActions } from '../blob-actions.entity';
import { BlobSenses } from '../blob-senses.entity';
import { BrainDto } from './brain.dto';
import { OptimizationStrategy } from './net/optimization/optimization.strategy';

export class BrainEntity {
  private _net: MultiLayerNetEntity;
  private _optimizationStrategy: OptimizationStrategy;

  constructor(
    initializedNet: MultiLayerNetEntity,
    optimazionStrategy: OptimizationStrategy,
  ) {
    this._net = initializedNet;
    this._optimizationStrategy = optimazionStrategy;
  }

  public useBrain(inputs: BlobSenses): BlobActions {
    this.net.input(inputs);
    this.net.calculate();
    return this.net.output();
  }

  public evolve(): BrainEntity {
    return new BrainEntity(
      this.optimizationStrategy.evolve(this.net),
      this.optimizationStrategy,
    );
  }

  public toDto(): BrainDto {
    const dto = new BrainDto();

    for (const edge of this.net.edges) {
      dto.addEdge(edge.toDto());
    }
    for (const node of this.net.nodes) {
      dto.addNode(node.toDto());
    }

    return dto;
  }

  get optimizationStrategy(): OptimizationStrategy {
    return this._optimizationStrategy;
  }

  set optimizationStrategy(value: OptimizationStrategy) {
    this._optimizationStrategy = value;
  }

  get net(): MultiLayerNetEntity {
    return this._net;
  }

  set net(value: MultiLayerNetEntity) {
    this._net = value;
  }
}
