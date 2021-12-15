import { ActivationStrategyInterface } from './activation-strategy.interface';

export class ReluActivationStrategy implements ActivationStrategyInterface {
  evaluate(n: number): number {
    if (n < 0) {
      return 0;
    }
    return n;
  }
}
