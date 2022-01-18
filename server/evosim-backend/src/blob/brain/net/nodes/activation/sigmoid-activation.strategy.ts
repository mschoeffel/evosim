import { ActivationStrategy } from './activation.strategy';

export class SigmoidActivationStrategy extends ActivationStrategy {
  constructor() {
    super('Sigmoid');
  }

  public evaluate(n: number): number {
    return 1.0 / (1.0 + Math.pow(Math.E, -n));
  }
}
