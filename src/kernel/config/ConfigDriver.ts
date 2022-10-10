import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { Kernel } from "../Kernel";

@InjectableClass()
export class ConfigDriver extends BaseInjectable {
 
 
 
 
  getValue(key: string): string {
    const kernel = this.resolve<Kernel>(Kernel);
    if (kernel.injector == null) throw new Error("kernel injector not set");
    if (kernel.injector.context == null)
      throw new Error("kernel injector context not set");
    if (!Object.keys(kernel.injector.context).includes(key))
      throw new Error("config key not found : " + key);
    return kernel.injector.context[key];
  }

  setValue(key : string , value :string )

  {

  }
}
