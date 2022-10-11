import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { GenericError } from "../errors/types/GenericError";
import { FsDriver } from "../fs/FsDriver";
import { PROPERTIES_FILE_NAME } from "./constants";
import { IProperties } from "./types/IProperties";
import { W_PROPERTY_SINGULAR } from "./wording";

@InjectableClass()
export class PropertiesDriver extends BaseInjectable {
  constructor() {
    super();
    this.properties = {};
  }

  propertyFileName = PROPERTIES_FILE_NAME;
  private properties: IProperties;

  async inject(properties: IProperties): Promise<void> {
    for (const key in properties) {
      this.properties[key] = properties[key];
    }
  }

  async clear(): Promise<void> {
    this.properties = {};
  }

  async load(): Promise<void> {
    const fs = this.resolve<FsDriver>(FsDriver);
    const hasLocalProperties = await fs.fileExists(this.propertyFileName);
    if (!hasLocalProperties) {
      return;
    }
    const localProperties = await fs.readJsonFile<Record<string, string>>(
      this.propertyFileName
    );
    await this.inject(localProperties);
  }

  async persist(): Promise<void> {
    const fs = this.resolve<FsDriver>(FsDriver);
    const currentProperties = Object.assign({}, this.properties);
    await fs.writeJsonFile(this.propertyFileName, currentProperties);
  }

  async getValue(key: string): Promise<string> {
    if (!Object.keys(this.properties).includes(key)) {
      throw GenericError.notFound(W_PROPERTY_SINGULAR, key);
    }
    return this.properties[key];
  }

  async getValueOrDefault(key: string, defaultValue: string): Promise<string> {
    if (!Object.keys(this.properties).includes(key)) {
      return defaultValue;
    }
    return this.properties[key];
  }

  async setValue(key: string, value: string): Promise<void> {
    this.properties[key] = value;
  }
}
