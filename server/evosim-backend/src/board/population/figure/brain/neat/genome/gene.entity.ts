export class GeneEntity {
  private _innovationNumber: number;

  constructor(innovationNumber?: number) {
    if (innovationNumber !== undefined) {
      this._innovationNumber = innovationNumber;
    }
  }

  get innovationNumber(): number {
    return this._innovationNumber;
  }

  set innovationNumber(value: number) {
    this._innovationNumber = value;
  }
}
