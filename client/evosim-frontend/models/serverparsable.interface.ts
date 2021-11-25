export interface ServerParsableInterface<F> {
  parseFromDto(obj: F): void;
}
