export interface INetworkClientHttpRequest {
  method: string;
  url: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: Buffer;
}
