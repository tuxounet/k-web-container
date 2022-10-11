import { Type } from "./types";
import { Injector } from "./Injector";
export type ContextType = "NONE" | "CLI" | "TESTING";

export const injectBootstrap = <T>(
  target: Type<any>,
  context: ContextType
): [T, () => void] => {
  // there is exactly one Injector pro entry point class instance
  const injector = new Injector();

  // bootstrap all dependencies
  const anyInstance: any = injector.resolve(target);
  anyInstance.injector = injector;
  return [anyInstance, () => injector.release()];
};
