import { IBootstrapContext } from "../bootstrap/types/IBootstrapContext";
import { BaseInjectable } from "../di/BaseInjectable";
import { EntryClass, InjectableClass } from "../di/types";
import { PropertiesDriver } from "./properties/PropertiesDriver";
import { ModulesDriver } from "./modules/ModulesDriver";
import { NetworkDriver } from "./network/NetworkDriver";

@InjectableClass()
export class Kernel extends BaseInjectable implements EntryClass {
  constructor(
    private readonly _configDriver: PropertiesDriver,
    private readonly _networkDriver: NetworkDriver,
    private readonly _modulesDriver: ModulesDriver
  ) {
    super();
    this.state = "OFF";
  }

  state: string;
  async boot(context: IBootstrapContext): Promise<void> {
    this.state = "START";
    // Injection de la config embarquée
    await this._configDriver.inject(context);
    // Chargement de la configuration persistante (si présente)
    await this._configDriver.load();
    this.state = "BOOTED";
    console.info(await this._configDriver.getValue("storage.provider"));
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
