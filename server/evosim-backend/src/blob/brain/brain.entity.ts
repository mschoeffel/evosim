import { MultiLayerNetEntity } from './net/multi-layer-net.entity';
import { BlobActions } from '../blob-actions.entity';
import { BlobSenses } from '../blob-senses.entity';
import { BrainDto } from './brain.dto';

export class BrainEntity {
  private readonly _net: MultiLayerNetEntity;

  constructor(initializedNet: MultiLayerNetEntity) {
    this._net = initializedNet;
  }

  public useBrain(inputs: BlobSenses): BlobActions {
    this.net.input(inputs);
    this.net.calculate();
    return this.net.output();
  }

  public toDto(): BrainDto {
    const dto = new BrainDto();

    for (const edge of this.net.edges()) {
      dto.addEdge(edge.toDto());
    }
    for (const node of this.net.nodes()) {
      dto.addNode(node.toDto());
    }

    return dto;
  }

  get net(): MultiLayerNetEntity {
    return this._net;
  }
}
