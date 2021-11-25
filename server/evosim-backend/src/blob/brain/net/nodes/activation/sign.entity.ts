import { ActivationInterface } from './activation.interface';

export class SignEntity implements ActivationInterface {
  evaluate(n: number): number {
    return Math.sign(n);
  }
}
