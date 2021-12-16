import { NetInterface } from './net.interface';
import { InputNodeEntity } from './nodes/input-node.entity';
import { OutputNodeEntity } from './nodes/output-node.entity';
import { HiddenNodeEntity } from './nodes/hidden-node.entity';
import { ConnectionEntity } from './connection.entity';
import { BlobSenses } from '../../blob-senses.entity';
import { BlobActions } from '../../blob-actions.entity';
import { NodeEntity } from './nodes/node.entity';
import { ActivationStrategy } from './nodes/activation/activation.strategy';

export class MultiLayerNetEntity extends NetInterface {
  private readonly _inputNodes: Array<InputNodeEntity>;
  private readonly _outputNodes: Array<OutputNodeEntity>;
  private readonly _hiddenNodes: Array<Array<HiddenNodeEntity>>;
  private readonly _nodes: Array<NodeEntity>;
  private readonly _edges: Array<ConnectionEntity>;
  private readonly _hiddenSchema: Array<number>;
  private readonly _activationStrategy: ActivationStrategy;

  constructor(
    hiddenSchema: Array<number>,
    activationStrategy: ActivationStrategy,
  ) {
    super();
    this._inputNodes = [];
    this._outputNodes = [];
    this._hiddenNodes = [];
    this._nodes = [];
    this._edges = [];
    this._activationStrategy = activationStrategy;
    this._hiddenSchema = hiddenSchema;
    this.initializeNetDetail(
      this.INPUT_NODES,
      this.OUTPUT_NODES,
      this.hiddenSchema,
    );
  }

  private initializeNetDetail(
    inputs: number,
    outputs: number,
    hiddenSchema: Array<number>,
  ): void {
    for (let i = 0; i < inputs; i++) {
      const node = new InputNodeEntity(0, i, this.activationStrategy);
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
          this.activationStrategy,
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
        this.activationStrategy,
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

  get outputNodes(): Array<OutputNodeEntity> {
    return this._outputNodes;
  }

  get hiddenNodes(): Array<Array<HiddenNodeEntity>> {
    return this._hiddenNodes;
  }

  get nodes(): Array<NodeEntity> {
    return this._nodes;
  }

  get edges(): Array<ConnectionEntity> {
    return this._edges;
  }

  get hiddenSchema(): Array<number> {
    return this._hiddenSchema;
  }

  get activationStrategy(): ActivationStrategy {
    return this._activationStrategy;
  }
}
