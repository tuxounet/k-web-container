import { IBootstrapContext } from "../types/IBootstrapContext";

const cliContext: IBootstrapContext = {
  type: "CLI",
  "storage.provider": "filesystem",
  "network.provider": "fetch",
};

export default cliContext;
