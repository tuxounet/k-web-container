import { IBootstrapContext } from "../bootstrap/types/IBootstrapContext";
import { BaseInjectable } from "../di/BaseInjectable";
import { EntryClass, InjectableClass } from "../di/types";
import { ConfigDriver } from "./config/ConfigDriver";
import { ModulesDriver } from "./modules/ModulesDriver";
import { NetworkDriver } from "./network/NetworkDriver";

@InjectableClass()
export class Kernel extends BaseInjectable implements EntryClass {
  constructor(
    private readonly _configDriver: ConfigDriver,
    private readonly _networkDriver: NetworkDriver,
    private readonly _modulesDriver: ModulesDriver
  ) {
    super();
    this.id = "not set";
  }

  bootstrapContext?: IBootstrapContext;

  id: string;
  async boot(): Promise<void> {
    console.info("starting");
    this.id = "booted";
    console.info(this._configDriver.getValue("storage.provider"));
    const result = await this._networkDriver.makeHttpRequest({
      method: "get",
      url: "http://checkip.dyndns.org",
    });
    console.info(result);
  }

  async shutdown(): Promise<void> {
    console.info("shutdown");
  }
}
