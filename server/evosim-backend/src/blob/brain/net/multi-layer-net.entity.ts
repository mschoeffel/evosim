import { NetInterface } from './net.interface';
import { InputNodeEntity } from './nodes/input-node.entity';
import { OutputNodeEntity } from './nodes/output-node.entity';
import { HiddenNodeEntity } from './nodes/hidden-node.entity';
import { ConnectionEntity } from './connection.entity';
import { BlobSenses } from '../../blob-senses.entity';
import { BlobActions } from '../../blob-actions.entity';
import { NodeEntity } from './nodes/node.entity';
import { SigmoidActivationStrategy } from './nodes/activation/sigmoid-activation.strategy';

export class MultiLayerNetEntity extends NetInterface {
  private _inputNodes: Array<InputNodeEntity>;
  private _outputNodes: Array<OutputNodeEntity>;
  private _hiddenNodes: Array<Array<HiddenNodeEntity>>;
  private _nodes: Array<NodeEntity>;
  private _edges: Array<ConnectionEntity>;
  private _hiddenSchema: Array<number>;

  public readonly ACTIVATION_STRATEGY = new SigmoidActivationStrategy();

  constructor() {
    super();
    this._inputNodes = [];
    this._outputNodes = [];
    this._hiddenNodes = [];
    this._nodes = [];
    this._edges = [];
  }

  public initializeNet(hiddenSchema: Array<number>): void {
    this.hiddenSchema = hiddenSchema;
    this.initializeNetDetail(this.INPUT_NODES, this.OUTPUT_NODES, hiddenSchema);
  }

  private initializeNetDetail(
    inputs: number,
    outputs: number,
    hiddenSchema: Array<number>,
  ): void {
    for (let i = 0; i < inputs; i++) {
      const node = new InputNodeEntity(0, i, this.ACTIVATION_STRATEGY);
      this.inputNodes.push(node);
      this.nodes.push(node);
    }

    let prevNodeLayer = this.inputNodes;
    let hiddenLayer = 1;
    for (const layer of hiddenSchema) {
      const hiddenNodeLayer = [];
      for (let nodeIndex = 0; nodeIndex < layer; nodeIndex++) {
        const hiddenNode = new HiddenNodeEntity(
          hiddenLayer,
          nodeIndex,
          this.ACTIVATION_STRATEGY,
        );
        this.setConnections(prevNodeLayer, hiddenNode);
        hiddenNodeLayer.push(hiddenNode);
        this.nodes.push(hiddenNode);
      }
      this.hiddenNodes.push(hiddenNodeLayer);
      prevNodeLayer = hiddenNodeLayer;
      hiddenLayer++;
    }

    for (let i = 0; i < outputs; i++) {
      const node = new OutputNodeEntity(
        hiddenLayer,
        i,
        this.ACTIVATION_STRATEGY,
      );
      this.setConnections(prevNodeLayer, node);
      this.outputNodes.push(node);
      this.nodes.push(node);
    }
  }

  public input(inputs: BlobSenses): void {
    this.inputNodes.at(0).value = inputs.currentPositionX;
    this.inputNodes.at(1).value = inputs.currentPositionY;
    this.inputNodes.at(2).value = inputs.currentDirection;
    this.inputNodes.at(3).value = inputs.currentEnergy;
    this.inputNodes.at(4).value = inputs.energyOfCurrentTile;
    this.inputNodes.at(5).value = inputs.energyOfTileAhead;
  }

  public calculate(): void {
    for (const hiddenLayer of this.hiddenNodes) {
      for (const hiddenNode of hiddenLayer) {
        hiddenNode.calculateValue();
      }
    }
    for (const outputNode of this.outputNodes) {
      outputNode.calculateValue();
    }
  }

  public output(): BlobActions {
    const actions = new BlobActions();
    actions.rotateAmount = this.outputNodes.at(0).value;
    actions.moveAmount = this.outputNodes.at(1).value;
    actions.eatAmount = this.outputNodes.at(2).value;
    return actions;
  }

  private setConnections(
    prevNodes: Array<HiddenNodeEntity | InputNodeEntity>,
    currentNode: HiddenNodeEntity | OutputNodeEntity,
  ): void {
    const incomingConnections = [];
    for (const prevNode of prevNodes) {
      const connection = new ConnectionEntity();
      connection.source = prevNode;
      connection.destination = currentNode;
      prevNode.outgoingConnections.push(connection);
      incomingConnections.push(connection);
      this.edges.push(connection);
    }
    currentNode.incomingConnections = incomingConnections;
  }

  get inputNodes(): Array<InputNodeEntity> {
    return this._inputNodes;
  }

  set inputNodes(value: Array<InputNodeEntity>) {
    this._inputNodes = value;
  }

  get outputNodes(): Array<OutputNodeEntity> {
    return this._outputNodes;
  }

  set outputNodes(value: Array<OutputNodeEntity>) {
    this._outputNodes = value;
  }

  get hiddenNodes(): Array<Array<HiddenNodeEntity>> {
    return this._hiddenNodes;
  }

  set hiddenNodes(value: Array<Array<HiddenNodeEntity>>) {
    this._hiddenNodes = value;
  }

  get nodes(): Array<NodeEntity> {
    return this._nodes;
  }

  set nodes(value: Array<NodeEntity>) {
    this._nodes = value;
  }

  get edges(): Array<ConnectionEntity> {
    return this._edges;
  }

  set edges(value: Array<ConnectionEntity>) {
    this._edges = value;
  }

  get hiddenSchema(): Array<number> {
    return this._hiddenSchema;
  }

  set hiddenSchema(value: Array<number>) {
    this._hiddenSchema = value;
  }
}
