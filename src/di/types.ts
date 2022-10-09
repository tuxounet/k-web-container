import { Injector } from "./Injector";

export type Type<T> = new (...args: any[]) => T;

export const InjectableClass = (): ((target: Type<any>) => void) => {
  return (target: Type<any>) => {};
};

export interface Releasable {
  release: () => void;
}

export interface EntryClass extends Releasable {
  injector?: Injector;
}
