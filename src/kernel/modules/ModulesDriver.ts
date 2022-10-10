import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { PropertiesDriver } from "../config/PropertiesDriver";
import { NetworkDriver } from "../network/NetworkDriver";
import { FsDriver } from "../fs/FsDriver";

@InjectableClass()
export class ModulesDriver extends BaseInjectable {
  constructor(
    private readonly _configDriver: PropertiesDriver,
    private readonly _networkDriver: NetworkDriver,
    private readonly _fsDriver: FsDriver
  ) {
    super();
    console.info("init modules");
  }

  async listAvailableModules(): Promise<void> {}

  async listInstalledModules(): Promise<void> {}

  async installModule(
    name: string,
    version: string,
    registry: string
  ): Promise<void> {}

  async uninstallModule(name: string): Promise<void> {}
}
