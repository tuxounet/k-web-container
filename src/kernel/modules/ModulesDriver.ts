import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { ConfigDriver } from "../config/ConfigDriver";
import { NetworkDriver } from "../network/NetworkDriver";
import { StorageDriver } from "../storage/StorageDriver";

@InjectableClass()
export class ModulesDriver extends BaseInjectable {
  constructor(
    private readonly _configDriver: ConfigDriver,
    private readonly _networkDriver: NetworkDriver,
    private readonly _storageDriver: StorageDriver
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
