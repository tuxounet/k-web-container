import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { ConfigDriver } from "../config/ConfigDriver";

@InjectableClass()
export class ModulesDriver extends BaseInjectable {
  constructor(private readonly _configDriver: ConfigDriver) {
    super();
    console.info("init modules");
  }

  getModules(): string {
    console.info(this._configDriver.id);
    return "ok";
  }
}
