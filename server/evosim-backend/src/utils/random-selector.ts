export class RandomSelector<T> {
  //TODO: Maybe change to single Tuple Array:
  private objects: Array<T>;
  private scores: Array<number>;
  private totalScore: number;

  constructor() {
    this.objects = [];
    this.scores = [];
    this.totalScore = 0;
  }

  public add(element: T, score: number): void {
    this.objects.push(element);
    this.scores.push(score);
    this.totalScore += score;
  }

  public random(): T {
    const randomScore = Math.random() * this.totalScore;
    let c = 0;

    for (let i = 0; i < this.objects.length; i++) {
      c += this.scores[i];
      if (c >= randomScore) {
        return this.objects[i];
      }
    }
    return null;
  }

  public reset(): void {
    this.objects = [];
    this.scores = [];
    this.totalScore = 0;
  }
}
