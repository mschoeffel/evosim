import { ActivationStrategyInterface } from './activation-strategy.interface';

export class SigmoidActivationStrategy implements ActivationStrategyInterface {
  private DEFAULT_EXP_PRECISION = 12;

  public evaluate(n: number): number {
    return 1.0 / (1.0 + this.fastExp(-n));
  }

  private fastExp(x: number, precision?: number): number {
    if (precision === null) {
      precision = this.DEFAULT_EXP_PRECISION;
    }
    const pow = 1 << precision;
    x = 1 + x / pow;
    for (; precision > 0; precision--) {
      x *= x;
    }
    return x;
  }
}
