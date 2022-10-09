import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";

@InjectableClass()
export class ConfigDriver extends BaseInjectable {
  constructor() {
    super();
    console.info("init config");
    this.id = new Date().toISOString();
  }

  id: string;

  getConfig(): string {
    return this.id;
  }
}
