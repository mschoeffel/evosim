import { ActivationStrategyInterface } from './activation-strategy.interface';

export class TanhActivationStrategy implements ActivationStrategyInterface {
  evaluate(n: number): number {
    return Math.tanh(n);
  }
}
