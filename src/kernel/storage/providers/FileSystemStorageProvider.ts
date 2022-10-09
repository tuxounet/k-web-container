import { BaseInjectable } from "../../../di/BaseInjectable";
import { InjectableClass } from "../../../di/types";
import { IStorageProvider } from "./IStorageProvider";

@InjectableClass()
export class FileSystemStorageProvider
  extends BaseInjectable
  implements IStorageProvider {}
