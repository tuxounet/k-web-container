import { Type } from "./types";
import { Injector } from "./Injector";
import { IBootstrapContext } from "../bootstrap/types/IBootstrapContext";

export const injectBootstrap = <T>(
  target: Type<any>,
  context: IBootstrapContext
): [T, () => void] => {
  // there is exactly one Injector pro entry point class instance
  const injector = new Injector();
  injector.context = context;
  // bootstrap all dependencies
  const anyInstance: any = injector.resolve(target);
  anyInstance.injector = injector;
  return [anyInstance, () => injector.release()];
};
