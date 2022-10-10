import { BaseInjectable } from "../../di/BaseInjectable";
import { InjectableClass } from "../../di/types";
import { PropertiesDriver } from "../config/PropertiesDriver";
import { GenericError } from "../errors/types/GenericError";
import { AxiosNetworkProvider } from "./providers/AxiosNetworkProvider";
import { INetworkClientHttpRequest } from "./types/INetworkClientHttpRequest";
import { INetworkClientHttpResponse } from "./types/INetworkClientHttpResponse";
import { INetworkProvider } from "./types/INetworkProvider";

@InjectableClass()
export class NetworkDriver extends BaseInjectable {
  constructor(private readonly _propertiesDriver: PropertiesDriver) {
    super();
    console.info("init network");
  }

  private async getProvider(): Promise<INetworkProvider> {
    const networkProvider = await this._propertiesDriver.getValue(
      "network.provider"
    );
    switch (networkProvider) {
      case "axios":
        return this.resolve<INetworkProvider>(AxiosNetworkProvider);
      default:
        throw GenericError.unsupportedQuery(
          "network provider",
          networkProvider
        );
    }
  }

  async makeHttpRequest(
    request: INetworkClientHttpRequest
  ): Promise<INetworkClientHttpResponse> {
    const provider = await this.getProvider();
    switch (request.method) {
      case "get":
        return await provider.httpClientGet(request);
      default:
        throw GenericError.unsupportedQuery(
          "http request method",
          request.method
        );
    }
  }
}
