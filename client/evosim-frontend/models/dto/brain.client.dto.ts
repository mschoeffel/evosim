import { NodeClientDto } from '~/models/dto/node.client.dto';
import { EdgeClientDto } from '~/models/dto/edge.client.dto';

export class BrainClientDto {
  _nodes: Array<NodeClientDto>;
  _edges: Array<EdgeClientDto>;

  constructor() {
    this._nodes = [];
    this._edges = [];
  }
}
