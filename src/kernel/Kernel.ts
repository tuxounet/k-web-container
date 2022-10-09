import { BaseInjectable } from "../di/BaseInjectable";
import { EntryClass, InjectableClass } from "../di/types";
import { ConfigDriver } from "./config/ConfigDriver";
import { ModulesDriver } from "./modules/ModulesDriver";

@InjectableClass()
export class Kernel extends BaseInjectable implements EntryClass {
  constructor(
    private readonly _configDriver: ConfigDriver,
    private readonly _modulesDriver: ModulesDriver
  ) {
    super();
    this.id = "not set";
  }

  id: string;
  async boot(): Promise<void> {
    console.info("starting");
    this.id = "booted";
    console.info(this._configDriver.getConfig());
    console.info(this._modulesDriver.getModules());
  }

  async shutdown(): Promise<void> {
    console.info("shutdown");
  }
}
