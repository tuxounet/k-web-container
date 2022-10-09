import { Releasable } from "../../../di/types";
import { INetworkClientHttpRequest } from "./INetworkClientHttpRequest";
import { INetworkClientHttpResponse } from "./INetworkClientHttpResponse";

export interface INetworkProvider extends Releasable {
  name: string;

  httpClientGet: (
    request: INetworkClientHttpRequest
  ) => Promise<INetworkClientHttpResponse>;
}
