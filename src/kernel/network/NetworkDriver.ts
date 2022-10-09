import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { ConfigDriver } from "../config/ConfigDriver";
import { AxiosNetworkProvider } from "./providers/AxiosNetworkProvider";
import { INetworkClientHttpRequest } from "./types/INetworkClientHttpRequest";
import { INetworkClientHttpResponse } from "./types/INetworkClientHttpResponse";
import { INetworkProvider } from "./types/INetworkProvider";

@InjectableClass()
export class NetworkDriver extends BaseInjectable {
  constructor(private readonly _configDriver: ConfigDriver) {
    super();
    console.info("init network");
  }

  private getProvider(): INetworkProvider {
    const networkProvider = this._configDriver.getValue("network.provider");
    switch (networkProvider) {
      case "fetch":
        return this.resolve<INetworkProvider>(AxiosNetworkProvider);
      default:
        throw new Error("unsupported provider : " + networkProvider);
    }
  }

  async makeHttpRequest(
    request: INetworkClientHttpRequest
  ): Promise<INetworkClientHttpResponse> {
    const provider = this.getProvider();
    switch (request.method) {
      case "get":
        return await provider.httpClientGet(request);
      default:
        throw new Error("request method supported " + request.method);
    }
  }
}
