import { NodeEntity } from './node.entity';
import { ConnectionEntity } from '../connection.entity';
import { ActivationStrategy } from './activation/activation.strategy';

export class InputNodeEntity extends NodeEntity {
  private _outgoingConnections: Array<ConnectionEntity>;

  constructor(layer: number, index: number, activation: ActivationStrategy) {
    super(layer, index, activation);
    this._outgoingConnections = [];
  }

  calculateValue(): number {
    return this.value;
  }

  get outgoingConnections(): Array<ConnectionEntity> {
    return this._outgoingConnections;
  }

  set outgoingConnections(value: Array<ConnectionEntity>) {
    this._outgoingConnections = value;
  }
}
