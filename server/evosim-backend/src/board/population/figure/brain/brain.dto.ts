import { NodeDto } from './node.dto';
import { EdgeDto } from './edge.dto';

export class BrainDto {
  private _nodes: Array<NodeDto>;
  private _edges: Array<EdgeDto>;

  constructor() {
    this._nodes = [];
    this._edges = [];
  }

  public addNode(node: NodeDto): void {
    this.nodes.push(node);
  }

  public addEdge(edge: EdgeDto): void {
    this.edges.push(edge);
  }

  get nodes(): Array<NodeDto> {
    return this._nodes;
  }

  set nodes(value: Array<NodeDto>) {
    this._nodes = value;
  }

  get edges(): Array<EdgeDto> {
    return this._edges;
  }

  set edges(value: Array<EdgeDto>) {
    this._edges = value;
  }
}
