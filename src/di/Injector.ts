import "reflect-metadata";
import { IBootstrapContext } from "../bootstrap/types/IBootstrapContext";

import { Type } from "./types";

export class Injector extends Map {
  context?: IBootstrapContext;

  public resolve<T>(target: Type<any>): T {
    const params: any = Reflect.getMetadata("design:paramtypes", target);
    const tokens = params === undefined ? [] : params;
    const injections = tokens.map((token: Type<any>) => {
      return this.resolve<any>(token);
    });

    const classInstance = this.get(target);
    if (classInstance !== undefined) {
      return classInstance;
    }
    const Target = target;
    const newClassInstance = new Target(...injections);
    const className = String(newClassInstance.constructor.name);
    this.set(target, newClassInstance);
    newClassInstance.injector = this;
    newClassInstance.className = className;
    console.log(`DI-Injector`, `created class ${className}`);

    return newClassInstance;
  }

  public release(): void {
    for (const value of this.values()) {
      if (typeof value.release === "function") {
        value.release();
      }
    }

    this.clear();
  }
}
