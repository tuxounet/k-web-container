import { InjectableClass } from "../../../di/types";
import { IConfigProvider } from "./IConfigProvider";

@InjectableClass()
export class FileSystemConfigProvider implements IConfigProvider {
  release(): void {}
}
