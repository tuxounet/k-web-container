import { Releasable } from "./types";
import { Injector } from "./Injector";

export class BaseInjectable implements Releasable {
  constructor() {
    if (this.className == null) this.className = "unknow";
  }

  injector?: Injector;
  className?: string;
  resolve<T extends BaseInjectable>(target: new (...args: any[]) => any): T {
    if (this.injector == null) {
      throw new Error("di injector not set");
    }
    return this.injector.resolve<T>(target);
  }

  release(): void {
    console.log(`DI-Injectable`, `released class ${String(this.className)}`);
  }
}
