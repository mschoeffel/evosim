import { ActivationInterface } from './activation.interface';

export class TanhEntity implements ActivationInterface {
  evaluate(n: number): number {
    return Math.tanh(n);
  }
}
