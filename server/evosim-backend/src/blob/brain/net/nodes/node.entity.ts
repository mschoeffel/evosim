import { ActivationStrategy } from './activation/activation.strategy';
import { v4 as uuid } from 'uuid';
import { NodeDto } from '../../node.dto';
import { Utils } from '../../../../utils/utils';

export abstract class NodeEntity {
  protected _value: number;
  protected readonly _id: string;
  private readonly _activationFunction: ActivationStrategy;
  private readonly _layer: number;
  private readonly _index: number;

  protected constructor(
    layer: number,
    index: number,
    activation: ActivationStrategy,
  ) {
    this._id = uuid();
    this._value = 0;
    this._layer = layer;
    this._index = index;
    this._activationFunction = activation;
  }

  public toDto(): NodeDto {
    const dto = new NodeDto();
    dto.id = this.id;
    //TODO: Rework Label -> Value
    dto.label = String(Utils.roundToTwoDigits(this.value));
    dto.x = this.layer * 100;
    dto.y = this.index * 100;
    return dto;
  }

  public abstract calculateValue(): number;

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get id(): string {
    return this._id;
  }

  public get activationFunction(): ActivationStrategy {
    return this._activationFunction;
  }

  get layer(): number {
    return this._layer;
  }

  get index(): number {
    return this._index;
  }
}
