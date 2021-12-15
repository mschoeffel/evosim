import { NodeClient } from '~/models/node.client';
import { EdgeClient } from '~/models/edge.client';
import { ServerParsableInterface } from '~/models/serverparsable.interface';
import { BrainClientDto } from '~/models/dto/brain.client.dto';

export class BrainClient implements ServerParsableInterface<BrainClientDto> {
  constructor() {
    this._nodes = [];
    this._edges = [];
  }

  private _nodes: Array<NodeClient>;

  get nodes(): Array<NodeClient> {
    return this._nodes;
  }

  set nodes(value: Array<NodeClient>) {
    this._nodes = value;
  }

  private _edges: Array<EdgeClient>;

  get edges(): Array<EdgeClient> {
    return this._edges;
  }

  set edges(value: Array<EdgeClient>) {
    this._edges = value;
  }

  parseFromDto(obj: BrainClientDto): void {
    for (const clientDtoNode of obj._nodes) {
      const clientNode = new NodeClient();
      clientNode.parseFromDto(clientDtoNode);
      this.nodes.push(clientNode);
    }
    for (const clientDtoEdge of obj._edges) {
      const clientEdge = new EdgeClient();
      clientEdge.parseFromDto(clientDtoEdge);
      this.edges.push(clientEdge);
    }
  }
}
