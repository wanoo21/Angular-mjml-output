export type Constructor<T = {}> = new (...args: any[]) => T;
export interface ITemplate {
  dir: string;
  tmpl?: string;
}

export interface InjectableClass {
  readonly template: Function;
  render(): string;
}
