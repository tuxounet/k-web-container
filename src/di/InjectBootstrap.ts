import { Type } from "./types";
import { Injector } from "./Injector";

export const injectBootstrap = <T>(target: Type<any>): [T, () => void] => {
  // there is exactly one Injector pro entry point class instance
  const injector = new Injector();
  // bootstrap all dependencies
  const anyInstance: any = injector.resolve(target);
  anyInstance.injector = injector;
  return [anyInstance, () => injector.release()];
};
