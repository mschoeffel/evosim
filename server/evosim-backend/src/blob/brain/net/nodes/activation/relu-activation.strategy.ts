import { ActivationStrategy } from './activation.strategy';

export class ReluActivationStrategy extends ActivationStrategy {
  constructor() {
    super('ReLU');
  }

  evaluate(n: number): number {
    if (n < 0) {
      return 0;
    }
    return n;
  }
}
