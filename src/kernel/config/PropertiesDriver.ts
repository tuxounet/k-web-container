import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { GenericError } from "../errors/types/GenericError";
import { FsDriver } from "../fs/FsDriver";
import { IProperties } from "./types/IProperties";

@InjectableClass()
export class PropertiesDriver extends BaseInjectable {
  constructor() {
    super();
    this.properties = {};
  }

  private readonly properties: IProperties;

  async inject(properties: IProperties): Promise<void> {
    for (const key in properties) {
      this.properties[key] = properties[key];
    }
  }

  async load(): Promise<void> {
    const fs = this.resolve<FsDriver>(FsDriver);
    const hasLocalProperties = await fs.fileExists("properties.json");
    if (!hasLocalProperties) {
      return;
    }
    const localProperties = await fs.readJsonFile<Record<string, string>>(
      "properties.json"
    );
    await this.inject(localProperties);
  }

  async persist(): Promise<void> {
    const fs = this.resolve<FsDriver>(FsDriver);
    const currentProperties = Object.assign({}, this.properties);
    await fs.writeJsonFile("properties.json", currentProperties);
  }

  async getValue(key: string): Promise<string> {
    if (!Object.keys(this.properties).includes(key)) {
      throw GenericError.notFound("property", key);
    }
    return this.properties[key];
  }

  async getValueOrDefault(key: string): Promise<string> {
    if (!Object.keys(this.properties).includes(key)) {
      throw GenericError.notFound("property", key);
    }
    return this.properties[key];
  }

  async setValue(key: string, value: string): Promise<void> {
    this.properties[key] = value;
  }
}
