import { ActivationStrategy } from './activation.strategy';

export class TanhActivationStrategy extends ActivationStrategy {
  constructor() {
    super('Tanh');
  }

  evaluate(n: number): number {
    return Math.tanh(n);
  }
}
