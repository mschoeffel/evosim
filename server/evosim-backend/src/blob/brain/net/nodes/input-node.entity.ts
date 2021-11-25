import { NodeEntity } from './node.entity';
import { ConnectionEntity } from '../connection.entity';
import { ActivationInterface } from './activation/activation.interface';

export class InputNodeEntity extends NodeEntity {
  private _outgoingConnections: Array<ConnectionEntity>;

  constructor(layer: number, index: number, activation: ActivationInterface) {
    super(layer, index, activation);
    this._outgoingConnections = [];
  }

  public get outgoingConnections(): Array<ConnectionEntity> {
    return this._outgoingConnections;
  }

  public set outgoingConnections(value: Array<ConnectionEntity>) {
    this._outgoingConnections = value;
  }

  calculateValue(): number {
    return this.value;
  }
}
