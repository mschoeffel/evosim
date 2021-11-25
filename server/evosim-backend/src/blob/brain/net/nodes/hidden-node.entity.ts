import { NodeEntity } from './node.entity';
import { ConnectionEntity } from '../connection.entity';
import { ActivationInterface } from './activation/activation.interface';

export class HiddenNodeEntity extends NodeEntity {
  private _incomingConnections: Array<ConnectionEntity>;
  private _outgoingConnections: Array<ConnectionEntity>;

  constructor(layer: number, index: number, activation: ActivationInterface) {
    super(layer, index, activation);
    this._incomingConnections = [];
    this._outgoingConnections = [];
  }

  public get incomingConnections(): Array<ConnectionEntity> {
    return this._incomingConnections;
  }

  public set incomingConnections(value: Array<ConnectionEntity>) {
    this._incomingConnections = value;
  }

  public get outgoingConnections(): Array<ConnectionEntity> {
    return this._outgoingConnections;
  }

  public set outgoingConnections(value: Array<ConnectionEntity>) {
    this._outgoingConnections = value;
  }

  calculateValue(): number {
    let value = 0;
    for (const incomingConnection of this.incomingConnections) {
      value += incomingConnection.weight * incomingConnection.source.value;
    }
    this.value = this.activationFunction.evaluate(value);
    return value;
  }
}
