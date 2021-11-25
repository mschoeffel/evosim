import { NodeEntity } from './nodes/node.entity';
import { EdgeDto } from '../edge.dto';
import { v4 as uuid } from 'uuid';
import { Utils } from '../../../utils/utils';
import { SigmoidEntity } from './nodes/activation/sigmoid.entity';

export class ConnectionEntity {
  private _id: string;
  private _source: NodeEntity;
  private _destination: NodeEntity;
  private _weight: number;
  private _mutation: number;

  public readonly MAXIMUM_WEIGHT = 10;
  public readonly MUTATION_RATE_MUTABILITY = 0.01;
  public readonly MAXIMUM_MUTATION_RATE = 0.1;
  public readonly INIT_MUTATION = 0.005;

  constructor() {
    this._id = uuid();
    this._weight = Math.random() * 2 - 1;
    this._mutation = this.INIT_MUTATION;
  }

  public toDto(): EdgeDto {
    const dto = new EdgeDto();
    dto.from = this.source.id;
    dto.to = this.destination.id;
    dto.title = String(Utils.roundToTwoDigits(this.weight));
    dto.label = String(Utils.roundToTwoDigits(this.weight));
    dto.id = this.id;
    dto.width = Utils.roundToTwoDigits((this.weight + 1) * 2);
    return dto;
  }

  public mutate(): ConnectionEntity {
    const newWeight = this.calcMutation(
      this.weight,
      this.mutation,
      this.MAXIMUM_WEIGHT,
    );
    const newMutation = this.calcMutation(
      this.mutation,
      this.MUTATION_RATE_MUTABILITY,
      this.MAXIMUM_MUTATION_RATE,
    );
    const connection = new ConnectionEntity();
    connection.weight = newWeight;
    connection.mutation = newMutation;
    return connection;
  }

  private calcMutation(input: number, rate: number, max: number): number {
    let mutatedOutput = input;
    if (Math.random() < rate) {
      mutatedOutput *= Math.random() * 2 - 1;
    }
    if (Math.abs(mutatedOutput) > max) {
      mutatedOutput = new SigmoidEntity().evaluate(mutatedOutput) * max;
    }
    return mutatedOutput;
  }

  public get source(): NodeEntity {
    return this._source;
  }

  public set source(value: NodeEntity) {
    this._source = value;
  }

  public get destination(): NodeEntity {
    return this._destination;
  }

  public set destination(value: NodeEntity) {
    this._destination = value;
  }

  public get weight(): number {
    return this._weight;
  }

  public set weight(value: number) {
    this._weight = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get mutation(): number {
    return this._mutation;
  }

  set mutation(value: number) {
    this._mutation = value;
  }
}
