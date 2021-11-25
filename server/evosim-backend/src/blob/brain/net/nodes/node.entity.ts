import { ActivationInterface } from './activation/activation.interface';
import { v4 as uuid } from 'uuid';
import { NodeDto } from '../../node.dto';
import { Utils } from '../../../../utils/utils';

export abstract class NodeEntity {
  protected _value: number;
  protected _id: string;
  private _activationFunction: ActivationInterface;
  private _layer: number;
  private _index: number;

  protected constructor(
    layer: number,
    index: number,
    activation: ActivationInterface,
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

  public set id(value: string) {
    this._id = value;
  }

  public get activationFunction(): ActivationInterface {
    return this._activationFunction;
  }

  public set activationFunction(value: ActivationInterface) {
    this._activationFunction = value;
  }

  get layer(): number {
    return this._layer;
  }

  set layer(value: number) {
    this._layer = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }
}
