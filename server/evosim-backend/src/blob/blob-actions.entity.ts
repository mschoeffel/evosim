export class BlobActions {
  private _rotateAmount: number;
  private _moveAmount: number;
  private _eatAmount: number;

  get rotateAmount(): number {
    return this._rotateAmount;
  }

  set rotateAmount(value: number) {
    this._rotateAmount = value;
  }

  get moveAmount(): number {
    return this._moveAmount;
  }

  set moveAmount(value: number) {
    this._moveAmount = value;
  }

  get eatAmount(): number {
    return this._eatAmount;
  }

  set eatAmount(value: number) {
    this._eatAmount = value;
  }
}
