import { MultiLayerNetEntity } from './net/multi-layer-net.entity';
import { BlobActions } from '../blob-actions.entity';
import { BlobSenses } from '../blob-senses.entity';
import { BrainDto } from './brain.dto';

export class BrainEntity {
  private _net: MultiLayerNetEntity;

  constructor(initializedNet: MultiLayerNetEntity) {
    this._net = initializedNet;
  }

  public useBrain(inputs: BlobSenses): BlobActions {
    this.net.input(inputs);
    this.net.calculate();
    return this.net.output();
  }

  public evolve(): BrainEntity {
    const net = new MultiLayerNetEntity();
    net.initializeNet(this.net.hiddenSchema);
    const brain = new BrainEntity(net);
    brain.net = this.net.evolve();
    return brain;
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

  get net(): MultiLayerNetEntity {
    return this._net;
  }

  set net(value: MultiLayerNetEntity) {
    this._net = value;
  }
}
