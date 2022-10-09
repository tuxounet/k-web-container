import { BaseInjectable } from "../../../di/BaseInjectable";
import { InjectableClass } from "../../../di/types";
import { INetworkClientHttpRequest } from "../types/INetworkClientHttpRequest";
import { INetworkClientHttpResponse } from "../types/INetworkClientHttpResponse";
import { INetworkProvider } from "../types/INetworkProvider";
import axios, { RawAxiosRequestHeaders } from "axios";
@InjectableClass()
export class AxiosNetworkProvider
  extends BaseInjectable
  implements INetworkProvider
{
  name = "axios";
  async httpClientGet(
    request: INetworkClientHttpRequest
  ): Promise<INetworkClientHttpResponse> {
    const headers: RawAxiosRequestHeaders = {};
    if (request.headers != null) {
      for (const key in request.headers) headers[key] = request.headers[key];
    }

    const result = await axios.get(request.url, {
      headers,
      validateStatus: () => true,
    });
    const response: INetworkClientHttpResponse = {
      status: result.status,
      statusDescription: result.statusText,
      body: result.data,
    };
    return response;
  }
}
