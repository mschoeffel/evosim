import { ActivationStrategy } from './activation.strategy';

export class SignActivationStrategy extends ActivationStrategy {
  constructor() {
    super('Sign');
  }

  evaluate(n: number): number {
    return Math.sign(n);
  }
}
