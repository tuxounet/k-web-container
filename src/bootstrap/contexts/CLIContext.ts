import { IBootstrapContext } from "../types/IBootstrapContext";

const cliContext: IBootstrapContext = {
  type: "CLI",
  "storage.provider": "filesystem",
  "network.provider": "axios",
};

export default cliContext;
