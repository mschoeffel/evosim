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
  private _inputNodes: Array<InputNodeEntity>;
  private _outputNodes: Array<OutputNodeEntity>;
  private _hiddenNodes: Array<Array<HiddenNodeEntity>>;
  private _hiddenSchema: Array<number>;
  private _activationStrategy: ActivationStrategy;

  constructor() {
    super();
    this._inputNodes = [];
    this._outputNodes = [];
    this._hiddenNodes = [];
    this._hiddenSchema = [];
  }

  public initializeNetDetail(
    inputs: number,
    outputs: number,
    hiddenSchema: Array<number>,
  ): void {
    this.initializeInput(inputs);

    let prevNodeLayer: Array<InputNodeEntity | HiddenNodeEntity> =
      this.inputNodes;
    let hiddenLayer = 1;
    this.hiddenSchema = [];
    this.hiddenNodes = [];
    for (const layer of hiddenSchema) {
      const hiddenNodeLayer = this.addNewHiddenLayer();
      for (let nodeIndex = 0; nodeIndex < layer; nodeIndex++) {
        const hiddenNode = this.addNewHiddenNodeToLayer(hiddenLayer - 1);
        this.populateAllConnections(prevNodeLayer, hiddenNode);
      }
      prevNodeLayer = hiddenNodeLayer;
      hiddenLayer++;
    }

    this.initializeOutput(outputs);
    for (const outputNode of this.outputNodes) {
      this.populateAllConnections(prevNodeLayer, outputNode);
    }
  }

  public input(inputs: BlobSenses): void {
    this.inputNodes[0].value = inputs.currentEnergy;
    this.inputNodes[1].value = inputs.energyOfCurrentTile;
    this.inputNodes[2].value = inputs.energyOfTileAhead;
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
    actions.rotateAmount = this.outputNodes[0].value;
    actions.moveAmount = this.outputNodes[1].value;
    actions.eatAmount = this.outputNodes[2].value;
    return actions;
  }

  private populateAllConnections(
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
    }
    currentNode.incomingConnections = incomingConnections;
  }

  public initializeInput(inputs: number): Array<InputNodeEntity> {
    this.inputNodes = [];
    for (let i = 0; i < inputs; i++) {
      const node = new InputNodeEntity(0, i, this.activationStrategy);
      this.inputNodes.push(node);
    }
    return this.inputNodes;
  }

  public initializeOutput(outputs: number): Array<OutputNodeEntity> {
    this.outputNodes = [];
    for (let i = 0; i < outputs; i++) {
      const node = new OutputNodeEntity(
        this.hiddenSchema.length + 1,
        i,
        this.activationStrategy,
      );
      this.outputNodes.push(node);
    }
    return this.outputNodes;
  }

  public addNewHiddenLayerAtIndex(
    index: number,
  ): Array<HiddenNodeEntity> | null {
    if (index >= 0 && index < this.hiddenSchema.length) {
      this.hiddenSchema.splice(index, 0, 0);
      this.hiddenNodes.splice(index, 0, []);
      for (let i = index + 1; i < this.hiddenNodes.length; i++) {
        for (const node of this.hiddenNodes[i]) {
          node.layer++;
        }
      }
      for (const node of this.outputNodes) {
        node.layer++;
      }
      return this.hiddenNodes[index];
    }
    return null;
  }

  public addNewHiddenLayer(): Array<HiddenNodeEntity> {
    this.hiddenSchema.push(0);
    this.hiddenNodes.push([]);
    for (const node of this.outputNodes) {
      node.layer++;
    }
    return this.hiddenNodes[this.hiddenNodes.length - 1];
  }

  public addNewHiddenNodeToLayer(
    indexOfHiddenLayers: number,
  ): HiddenNodeEntity | null {
    if (
      indexOfHiddenLayers >= 0 &&
      indexOfHiddenLayers < this.hiddenSchema.length &&
      this.activationStrategy !== undefined
    ) {
      const node = new HiddenNodeEntity(
        indexOfHiddenLayers + 1,
        this.hiddenSchema[indexOfHiddenLayers],
        this.activationStrategy,
      );
      this.hiddenNodes[indexOfHiddenLayers].push(node);
      this.hiddenSchema[indexOfHiddenLayers]++;
      return node;
    }
    return null;
  }

  public addConnectionBetweenTwoNodes(
    nodeFrom: InputNodeEntity | HiddenNodeEntity,
    nodeTo: HiddenNodeEntity | OutputNodeEntity,
  ): ConnectionEntity {
    const connection = new ConnectionEntity();
    connection.source = nodeFrom;
    connection.destination = nodeTo;
    nodeFrom.outgoingConnections.push(connection);
    nodeTo.incomingConnections.push(connection);
    return connection;
  }

  public nodes(): Array<NodeEntity> {
    const nodes = [];
    for (const node of this.inputNodes) {
      nodes.push(node);
    }
    for (const layer of this.hiddenNodes) {
      for (const node of layer) {
        nodes.push(node);
      }
    }
    for (const node of this.outputNodes) {
      nodes.push(node);
    }
    return nodes;
  }

  public edges(): Array<ConnectionEntity> {
    const edgeMap = new Map<string, ConnectionEntity>();
    for (const node of this.inputNodes) {
      for (const outgoingConnection of node.outgoingConnections) {
        if (!edgeMap.has(outgoingConnection.id)) {
          edgeMap.set(outgoingConnection.id, outgoingConnection);
        }
      }
    }
    for (const layer of this.hiddenNodes) {
      for (const node of layer) {
        for (const incomingConnection of node.incomingConnections) {
          if (!edgeMap.has(incomingConnection.id)) {
            edgeMap.set(incomingConnection.id, incomingConnection);
          }
        }
        for (const outgoingConnection of node.outgoingConnections) {
          if (!edgeMap.has(outgoingConnection.id)) {
            edgeMap.set(outgoingConnection.id, outgoingConnection);
          }
        }
      }
    }
    for (const node of this.outputNodes) {
      for (const incomingConnection of node.incomingConnections) {
        if (!edgeMap.has(incomingConnection.id)) {
          edgeMap.set(incomingConnection.id, incomingConnection);
        }
      }
    }
    return Array.from(edgeMap.values());
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

  get hiddenSchema(): Array<number> {
    return this._hiddenSchema;
  }

  set hiddenSchema(value: Array<number>) {
    this._hiddenSchema = value;
  }

  get activationStrategy(): ActivationStrategy {
    return this._activationStrategy;
  }

  set activationStrategy(value: ActivationStrategy) {
    this._activationStrategy = value;
  }
}
