import { NodeEntity } from './node.entity';
import { ConnectionEntity } from '../connection.entity';
import { ActivationInterface } from './activation/activation.interface';

export class OutputNodeEntity extends NodeEntity {
  private _incomingConnections: Array<ConnectionEntity>;

  constructor(layer: number, index: number, activation: ActivationInterface) {
    super(layer, index, activation);
    this._incomingConnections = [];
  }

  public get incomingConnections(): Array<ConnectionEntity> {
    return this._incomingConnections;
  }

  public set incomingConnections(value: Array<ConnectionEntity>) {
    this._incomingConnections = value;
  }

  calculateValue(): number {
    let value = 0;
    for (const incomingConnection of this.incomingConnections) {
      value += incomingConnection.weight * incomingConnection.source.value;
    }
    this.value = value;
    return value;
  }
}
