import { ActivationStrategyInterface } from './activation-strategy.interface';

export class SignActivationStrategy implements ActivationStrategyInterface {
  evaluate(n: number): number {
    return Math.sign(n);
  }
}
